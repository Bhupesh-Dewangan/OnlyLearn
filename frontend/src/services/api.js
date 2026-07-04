// Centralized API client for OnlyLearn
const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Health
  checkHealth: () => request("/health"),

  // Videos
  getVideos: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/videos${query ? `?${query}` : ""}`);
  },
  getVideoById: (id) => request(`/videos/${id}`),
  importVideo: (url) => request("/videos", { method: "POST", body: { url } }),
  toggleFavorite: (id) => request(`/videos/${id}/favorite`, { method: "PATCH" }),
  deleteVideo: (id) => request(`/videos/${id}`, { method: "DELETE" }),

  // Playlists
  getPlaylists: () => request("/playlists"),
  getPlaylistById: (id) => request(`/playlists/${id}`),
  createPlaylist: (playlistData) => request("/playlists", { method: "POST", body: playlistData }),
  addVideoToPlaylist: (playlistId, videoId) =>
    request(`/playlists/${playlistId}/videos`, { method: "POST", body: { videoId } }),
  removeVideoFromPlaylist: (playlistId, videoId) =>
    request(`/playlists/${playlistId}/videos/${videoId}`, { method: "DELETE" }),
  deletePlaylist: (id) => request(`/playlists/${id}`, { method: "DELETE" }),

  // Progress / History
  getHistory: (userId, limit = 50) => {
    const query = new URLSearchParams({ ...(userId ? { userId } : {}), limit }).toString();
    return request(`/progress/history?${query}`);
  },
  saveProgress: (progressData) => request("/progress/update", { method: "POST", body: progressData }),
  clearHistory: (userId) => {
    const query = userId ? `?userId=${userId}` : "";
    return request(`/progress/history${query}`, { method: "DELETE" });
  },

  // Notes
  getNotesByVideo: (videoId, userId) => {
    const query = userId ? `?userId=${userId}` : "";
    return request(`/notes/video/${videoId}${query}`);
  },
  createNote: (noteData) => request("/notes", { method: "POST", body: noteData }),
  updateNote: (id, updateData) => request(`/notes/${id}`, { method: "PATCH", body: updateData }),
  deleteNote: (id) => request(`/notes/${id}`, { method: "DELETE" }),

  // Analytics
  recordSession: (sessionData) => request("/analytics/session", { method: "POST", body: sessionData }),
  getAnalytics: (userId, days = 30) => request(`/analytics/user?userId=${userId}&days=${days}`),
  getLeaderboard: (limit = 20) => request(`/analytics/leaderboard?limit=${limit}`),
};

export default api;
