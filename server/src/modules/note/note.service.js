const Note = require("./note.model");

const getNotesByVideo = async (videoId, userId) => {
  const query = { videoId };
  if (userId) query.userId = userId;
  return await Note.find(query).sort({ timestampSeconds: 1 });
};

const createNote = async (noteData) => {
  return await Note.create(noteData);
};

const updateNote = async (id, updateData) => {
  return await Note.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

module.exports = {
  getNotesByVideo,
  createNote,
  updateNote,
  deleteNote,
};

