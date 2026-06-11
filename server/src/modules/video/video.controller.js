const videoService = require("./video.service");

const getVideos = async (req, res, next) => {
  try {
    const { favorite, tag } = req.query;
    const filter = {};
    if (favorite === "true") filter.isFavorite = true;
    if (tag) filter.tags = tag;

    const videos = await videoService.getAllVideos(filter);
    res.json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    next(error);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    res.json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const video = await videoService.importVideo(req.body);
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

const toggleFavorite = async (req, res, next) => {
  try {
    const video = await videoService.toggleFavorite(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    res.json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

const removeVideo = async (req, res, next) => {
  try {
    const video = await videoService.deleteVideo(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }
    res.json({ success: true, message: "Video removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideos,
  getVideo,
  createVideo,
  toggleFavorite,
  removeVideo,
};

