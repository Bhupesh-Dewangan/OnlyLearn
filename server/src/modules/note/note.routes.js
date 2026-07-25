const express = require("express");
const router = express.Router();
const noteController = require("./note.controller");

router.get("/video/:videoId", noteController.getNotes);
router.post("/", noteController.createNote);
router.patch("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;

