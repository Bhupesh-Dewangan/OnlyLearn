const express = require("express");
const router = express.Router();
const progressController = require("./progress.controller");

router.get("/history", progressController.getHistory);
router.post("/update", progressController.saveProgress);
router.delete("/history", progressController.clearHistory);

module.exports = router;

