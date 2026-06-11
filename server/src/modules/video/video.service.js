const Video = require("./video.model");

const getAllVideos = async (filter = {}) => {
  return await Video.find(filter).sort({ createdAt: -1 });
};

const getVideoById = async (id) => {
  return await Video.findById(id);
};

const importVideo = async (videoData) => {
  // Check if video with this URL or platformId already exists
  if (videoData.platformId) {
    const existing = await Video.findOne({ platformId: videoData.platformId });
    if (existing) return existing;
  }
  return await Video.create(videoData);
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
  getAllVideos,
  getVideoById,
  importVideo,
  toggleFavorite,
  deleteVideo,
};

