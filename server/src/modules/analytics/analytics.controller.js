const analyticsService = require("./analytics.service");

const recordSession = async (req, res, next) => {
  try {
    const { userId, minutes, completed } = req.body;
    if (!userId || minutes === undefined) {
      return res.status(400).json({ success: false, message: "userId and minutes are required" });
    }
    const log = await analyticsService.recordStudySession(userId, minutes, completed);
    res.json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const { userId, days } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query parameter is required" });
    }
    const logs = await analyticsService.getUserAnalytics(userId, days);
    res.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};

const getLeaderboard = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const leaderboard = await analyticsService.getLeaderboard(limit);
    res.json({ success: true, count: leaderboard.length, data: leaderboard });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordSession,
  getAnalytics,
  getLeaderboard,
};

