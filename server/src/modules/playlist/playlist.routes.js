const express = require("express");
const router = express.Router();
const playlistController = require("./playlist.controller");

router.get("/", playlistController.getPlaylists);
router.post("/", playlistController.createPlaylist);
router.get("/:id", playlistController.getPlaylist);
router.post("/:id/videos", playlistController.addVideo);
router.delete("/:id/videos/:videoId", playlistController.removeVideo);
router.delete("/:id", playlistController.deletePlaylist);

module.exports = router;

