const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");

// Import Module Routes
const userRoutes = require("./modules/user/user.routes");
const videoRoutes = require("./modules/video/video.routes");
const playlistRoutes = require("./modules/playlist/playlist.routes");
const progressRoutes = require("./modules/progress/progress.routes");
const noteRoutes = require("./modules/note/note.routes");
const analyticsRoutes = require("./modules/analytics/analytics.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.send("Backend is running smoothly!");
});

// Health Check
app.get("/api/health", (req, res) => {
  const dbStatusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };
  const status = dbStatusMap[mongoose.connection.readyState] || "Unknown";
  res.json({
    status: "ok",
    database: status,
    timestamp: new Date().toISOString(),
  });
});

// Mount Module Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/analytics", analyticsRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;

