const express = require("express");
const router = express.Router();
const videoController = require("./video.controller");

router.get("/", videoController.getVideos);
router.post("/", videoController.createVideo);
router.get("/:id", videoController.getVideo);
router.patch("/:id/favorite", videoController.toggleFavorite);
router.delete("/:id", videoController.removeVideo);

module.exports = router;

