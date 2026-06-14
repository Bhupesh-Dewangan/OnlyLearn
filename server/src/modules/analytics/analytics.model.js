const mongoose = require("mongoose");

const studyLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
      index: true,
    },
    minutesLearned: {
      type: Number,
      default: 0,
    },
    videosCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

studyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("StudyLog", studyLogSchema);

