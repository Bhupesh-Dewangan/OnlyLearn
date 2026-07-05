const progressService = require("./progress.service");

const getHistory = async (req, res, next) => {
  try {
    const { userId, limit } = req.query;
    const history = await progressService.getHistory(userId, limit);
    res.json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

const saveProgress = async (req, res, next) => {
  try {
    const progress = await progressService.updateProgress(req.body);
    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

const clearHistory = async (req, res, next) => {
  try {
    const { userId } = req.query;
    await progressService.clearHistory(userId);
    res.json({ success: true, message: "History cleared successfully" });
  } catch (error) {
    next(error);
  }
};

const getVideoProgress = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { userId } = req.query;
    const progress = await progressService.getProgressByVideo(videoId, userId);
    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory,
  getVideoProgress,
  saveProgress,
  clearHistory,
};

