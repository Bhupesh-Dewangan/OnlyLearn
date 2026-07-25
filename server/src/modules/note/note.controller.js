const noteService = require("./note.service");

const getNotes = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { userId } = req.query;
    const notes = await noteService.getNotesByVideo(videoId, userId);
    res.json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

