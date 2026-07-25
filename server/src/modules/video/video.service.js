const Video = require("./video.model");

// Helper to extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  if (!url || typeof url !== "string") return null;
  const cleanedUrl = url.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanedUrl)) {
    return cleanedUrl;
  }

  const match = cleanedUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Helper to fetch metadata from YouTube oEmbed API
async function fetchYouTubeMetadata(videoId) {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const res = await fetch(oembedUrl);
    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title || `YouTube Video (${videoId})`,
        channelName: data.author_name || "YouTube Creator",
        channelUrl: data.author_url || "",
        thumbnailUrl:
          data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    }
  } catch (err) {
    console.warn(`oEmbed fetch failed for video ${videoId}:`, err.message);
  }

  // Graceful fallback if oEmbed is unavailable
  return {
    title: `YouTube Video (${videoId})`,
    channelName: "YouTube Creator",
    channelUrl: "",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };
}

const getAllVideos = async (filter = {}) => {
  return await Video.find(filter).sort({ createdAt: -1 });
};

const getVideoById = async (id) => {
  return await Video.findById(id);
};

const importVideo = async (payload) => {
  const { url, title, duration, tags, importedBy } = payload;

  if (!url) {
    const err = new Error("A valid video URL is required");
    err.statusCode = 400;
    throw err;
  }

  // Extract YouTube ID
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    const err = new Error(
      "Unsupported or invalid URL format. Please provide a valid YouTube video link."
    );
    err.statusCode = 400;
    throw err;
  }

  // Check if video already exists in library
  const existing = await Video.findOne({ platformId: videoId });
  if (existing) {
    return { video: existing, isExisting: true };
  }

  // Fetch metadata if not manually provided
  let metadata = {
    title,
    channelName: payload.channelName,
    channelUrl: payload.channelUrl,
    thumbnailUrl: payload.thumbnailUrl,
  };

  if (!title) {
    const fetched = await fetchYouTubeMetadata(videoId);
    metadata = {
      title: fetched.title,
      channelName: fetched.channelName,
      channelUrl: fetched.channelUrl,
      thumbnailUrl: fetched.thumbnailUrl,
    };
  }

  const newVideo = await Video.create({
    url: `https://www.youtube.com/watch?v=${videoId}`,
    platform: "youtube",
    platformId: videoId,
    title: metadata.title,
    channelName: metadata.channelName || "YouTube Creator",
    channelUrl: metadata.channelUrl || "",
    thumbnailUrl:
      metadata.thumbnailUrl ||
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    duration: duration || 0,
    tags: Array.isArray(tags) ? tags : [],
    importedBy: importedBy || null,
  });

  return { video: newVideo, isExisting: false };
};

const toggleFavorite = async (id) => {
  const video = await Video.findById(id);
  if (!video) return null;
  video.isFavorite = !video.isFavorite;
  return await video.save();
};

const deleteVideo = async (id) => {
  return await Video.findByIdAndDelete(id);
};

module.exports = {
  extractYouTubeId,
  fetchYouTubeMetadata,
  getAllVideos,
  getVideoById,
  importVideo,
  toggleFavorite,
  deleteVideo,
};
