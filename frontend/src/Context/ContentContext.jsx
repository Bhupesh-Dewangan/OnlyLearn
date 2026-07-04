/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useCallback } from "react";
import api from "../services/api";

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error' | 'info', message: string }

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  }, []);

  const fetchVideos = useCallback(async (filter = {}) => {
    try {
      setIsLoadingVideos(true);
      const res = await api.getVideos(filter);
      if (res.success && Array.isArray(res.data)) {
        setVideos(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err.message);
    } finally {
      setIsLoadingVideos(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const importVideo = async (url) => {
    if (!url || !url.trim()) {
      showNotification("Please provide a valid video link", "error");
      return;
    }

    try {
      setIsImporting(true);
      const res = await api.importVideo(url.trim());

      if (res.success) {
        showNotification(res.message || "Video imported successfully!", res.isExisting ? "info" : "success");
        // Prepend new video if not already in list
        setVideos((prev) => {
          const exists = prev.some((v) => v._id === res.data._id);
          return exists ? prev : [res.data, ...prev];
        });
        return res.data;
      }
    } catch (err) {
      showNotification(err.message || "Failed to import video", "error");
      throw err;
    } finally {
      setIsImporting(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const res = await api.toggleFavorite(id);
      if (res.success && res.data) {
        setVideos((prev) =>
          prev.map((v) => (v._id === id ? { ...v, isFavorite: res.data.isFavorite } : v))
        );
      }
    } catch (err) {
      showNotification(err.message || "Failed to update favorite status", "error");
    }
  };

  const deleteVideo = async (id) => {
    try {
      const res = await api.deleteVideo(id);
      if (res.success) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
        showNotification("Video removed from library", "success");
      }
    } catch (err) {
      showNotification(err.message || "Failed to delete video", "error");
    }
  };

  return (
    <ContentContext.Provider
      value={{
        videos,
        isLoadingVideos,
        isImporting,
        notification,
        showNotification,
        refreshVideos: fetchVideos,
        importVideo,
        toggleFavorite,
        deleteVideo,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
}
