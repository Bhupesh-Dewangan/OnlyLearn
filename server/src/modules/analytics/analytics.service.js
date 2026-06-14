const StudyLog = require("./analytics.model");
const User = require("../user/user.model");

const recordStudySession = async (userId, minutes, completed = false) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const log = await StudyLog.findOneAndUpdate(
    { userId, date: today },
    {
      $inc: {
        minutesLearned: minutes,
        videosCompleted: completed ? 1 : 0,
      },
    },
    { new: true, upsert: true }
  );

  // Update total minutes on user profile
  await User.findByIdAndUpdate(userId, {
    $inc: { totalStudyMinutes: minutes },
  });

  return log;
};

const getUserAnalytics = async (userId, days = 30) => {
  return await StudyLog.find({ userId })
    .sort({ date: -1 })
    .limit(Number(days));
};

const getLeaderboard = async (limit = 20) => {
  return await User.find({})
    .select("username avatarUrl streakCount totalStudyMinutes")
    .sort({ totalStudyMinutes: -1, streakCount: -1 })
    .limit(Number(limit));
};

module.exports = {
  recordStudySession,
  getUserAnalytics,
  getLeaderboard,
};

