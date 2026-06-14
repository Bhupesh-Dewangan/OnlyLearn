const express = require("express");
const router = express.Router();
const analyticsController = require("./analytics.controller");

router.post("/session", analyticsController.recordSession);
router.get("/user", analyticsController.getAnalytics);
router.get("/leaderboard", analyticsController.getLeaderboard);

module.exports = router;

