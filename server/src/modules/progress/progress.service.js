const WatchProgress = require("./progress.model");

const getHistory = async (userId, limit = 50) => {
  const query = userId ? { userId } : {};
  return await WatchProgress.find(query)
    .populate("videoId")
    .sort({ lastWatchedAt: -1 })
    .limit(Number(limit));
};

const updateProgress = async ({ userId, videoId, playbackPositionSeconds, durationSeconds, isCompleted }) => {
  const filter = userId ? { userId, videoId } : { videoId };
  const update = {
    playbackPositionSeconds,
    lastWatchedAt: new Date(),
  };

  if (durationSeconds !== undefined) update.durationSeconds = durationSeconds;
  if (isCompleted !== undefined) update.isCompleted = isCompleted;

  return await WatchProgress.findOneAndUpdate(
    filter,
    { $set: update },
    { new: true, upsert: true }
  ).populate("videoId");
};

const clearHistory = async (userId) => {
  const query = userId ? { userId } : {};
  return await WatchProgress.deleteMany(query);
};

const getProgressByVideo = async (videoId, userId) => {
  const filter = userId ? { userId, videoId } : { videoId };
  return await WatchProgress.findOne(filter).populate("videoId");
};

module.exports = {
  getHistory,
  getProgressByVideo,
  updateProgress,
  clearHistory,
};

