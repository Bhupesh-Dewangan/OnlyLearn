const playlistService = require("./playlist.service");

const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getAllPlaylists();
    res.json({ success: true, count: playlists.length, data: playlists });
  } catch (error) {
    next(error);
  }
};

const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

const addVideo = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const playlist = await playlistService.addVideoToPlaylist(req.params.id, videoId);
    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

const removeVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const playlist = await playlistService.removeVideoFromPlaylist(req.params.id, videoId);
    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.deletePlaylist(req.params.id);
    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, message: "Playlist deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  addVideo,
  removeVideo,
  deletePlaylist,
};

