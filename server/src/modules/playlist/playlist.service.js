const Playlist = require("./playlist.model");

const getAllPlaylists = async (filter = {}) => {
  return await Playlist.find(filter).populate("videos").sort({ createdAt: -1 });
};

const getPlaylistById = async (id) => {
  return await Playlist.findById(id).populate("videos");
};

const createPlaylist = async (playlistData) => {
  return await Playlist.create(playlistData);
};

const addVideoToPlaylist = async (playlistId, videoId) => {
  return await Playlist.findByIdAndUpdate(
    playlistId,
    { $addToSet: { videos: videoId } },
    { new: true }
  ).populate("videos");
};

const removeVideoFromPlaylist = async (playlistId, videoId) => {
  return await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: videoId } },
    { new: true }
  ).populate("videos");
};

const deletePlaylist = async (id) => {
  return await Playlist.findByIdAndDelete(id);
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
};

