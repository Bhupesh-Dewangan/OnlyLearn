import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useContent } from "../Context/ContentContext";
import { IoArrowBack, IoCheckmarkCircle, IoCheckmarkCircleOutline, IoExpand, IoContract } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiExternalLink, FiClock } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

function formatSeconds(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "00:00";
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function Watch() {
  const { id } = useParams();
  const { toggleFavorite } = useContent();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedPosition, setSavedPosition] = useState(0);
  const [isTheater, setIsTheater] = useState(false);

  const playerRef = useRef(null);
  const syncIntervalRef = useRef(null);

  // Sync progress to backend
  const syncProgress = useCallback(
    async (currentTime, duration, completed = false) => {
      if (!id || !currentTime) return;
      try {
        await api.saveProgress({
          videoId: id,
          playbackPositionSeconds: Math.floor(currentTime),
          durationSeconds: Math.floor(duration || 0),
          isCompleted: completed,
        });
      } catch (err) {
        console.warn("Failed to sync watch progress:", err.message);
      }
    },
    [id]
  );

  // Initialize YouTube IFrame Player
  const initPlayer = useCallback(
    (platformId, startSeconds = 0) => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("yt-embed-player", {
        videoId: platformId,
        playerVars: {
          autoplay: 1,
          start: Math.floor(startSeconds),
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            if (startSeconds > 5) {
              playerRef.current.seekTo(startSeconds, true);
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1
            if (event.data === 1) {
              if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
              syncIntervalRef.current = setInterval(() => {
                if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                  const curr = playerRef.current.getCurrentTime();
                  const dur = playerRef.current.getDuration();
                  syncProgress(curr, dur, isCompleted);
                }
              }, 10000);
            } else {
              if (syncIntervalRef.current) {
                clearInterval(syncIntervalRef.current);
                syncIntervalRef.current = null;
              }
              // Save progress when paused or stopped
              if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                const curr = playerRef.current.getCurrentTime();
                const dur = playerRef.current.getDuration();
                const ended = event.data === 0; // YT.PlayerState.ENDED = 0
                if (ended) setIsCompleted(true);
                syncProgress(curr, dur, ended || isCompleted);
              }
            }
          },
        },
      });
    },
    [isCompleted, syncProgress]
  );

  // Load video and progress data
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [videoRes, progressRes] = await Promise.allSettled([
          api.getVideoById(id),
          api.getVideoProgress(id),
        ]);

        if (videoRes.status === "fulfilled" && videoRes.value.success) {
          const videoData = videoRes.value.data;
          if (isMounted) setVideo(videoData);

          let startSec = 0;
          if (progressRes.status === "fulfilled" && progressRes.value?.data) {
            const prog = progressRes.value.data;
            startSec = prog.playbackPositionSeconds || 0;
            if (isMounted) {
              setSavedPosition(startSec);
              setIsCompleted(!!prog.isCompleted);
            }
          }

          // Ensure YouTube API script is loaded
          if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            window.onYouTubeIframeAPIReady = () => {
              if (isMounted) initPlayer(videoData.platformId, startSec);
            };
            document.body.appendChild(tag);
          } else {
            initPlayer(videoData.platformId, startSec);
          }
        } else {
          throw new Error("Video not found or could not be loaded");
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, [id, initPlayer]);

  const handleToggleComplete = async () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
      const curr = playerRef.current.getCurrentTime();
      const dur = playerRef.current.getDuration();
      await syncProgress(curr, dur, nextState);
    }
  };

  const handleToggleFavorite = async () => {
    if (!video) return;
    await toggleFavorite(video._id);
    setVideo((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <CgSpinner className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading focused learning session...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Unable to Load Video</h2>
        <p className="text-slate-500 dark:text-slate-400">{error || "Video does not exist"}</p>
        <Link
          to="/videos"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          <IoArrowBack className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`mx-auto space-y-6 ${isTheater ? "max-w-full px-2" : "max-w-5xl"}`}>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/videos"
          className="inline-flex items-center space-x-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <IoArrowBack className="w-4 h-4" />
          <span>Back to Videos</span>
        </Link>

        <div className="flex items-center space-x-2">
          {savedPosition > 10 && (
            <span className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <FiClock className="w-3.5 h-3.5" />
              <span>Resumed at {formatSeconds(savedPosition)}</span>
            </span>
          )}

          <button
            onClick={() => setIsTheater((prev) => !prev)}
            aria-label="Toggle Theater Mode"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title={isTheater ? "Exit Theater Mode" : "Theater Mode"}
          >
            {isTheater ? <IoContract className="w-4 h-4" /> : <IoExpand className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-slate-900/10">
        <div id="yt-embed-player" className="w-full h-full" />
      </div>

      {/* Video Information Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {video.title}
            </h1>
            <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">{video.channelName || "YouTube Creator"}</span>
              {video.channelUrl && (
                <a
                  href={video.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Channel</span>
                  <FiExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-750"
              }`}
            >
              {isCompleted ? (
                <>
                  <IoCheckmarkCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <IoCheckmarkCircleOutline className="w-4 h-4" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleFavorite}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                video.isFavorite
                  ? "bg-red-50 text-red-500 border-red-200 dark:bg-red-950/80 dark:border-red-900"
                  : "bg-slate-100 text-slate-500 border-slate-200 hover:text-red-500 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
              }`}
              title={video.isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            >
              {video.isFavorite ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Video Description */}
        {video.description && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
              {video.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Watch;
