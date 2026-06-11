const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.get("/:id", userController.getProfile);
router.patch("/:id/preferences", userController.updatePreferences);

module.exports = router;

