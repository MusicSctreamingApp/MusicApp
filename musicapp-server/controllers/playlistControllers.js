const Playlist = require("../models/playlistModel");
const mongoose = require("mongoose");

// GET ALL USER playlists
const getPlaylists = async (req, res) => {
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const playlists = await Playlist.find()
    // .populate({ songs }) // NOT SURE THAT'S HOW IT WORKS-----------------------<<<
    .sort({ createdAt: -1 });

  res.status(200).json(playlists);
};
// GET ALL USER playlists
const getUserPlaylists = async (req, res) => {
  const user_id = req.user._id;
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const playlists = await Playlist.find({ user_id })
    // .populate({ songs }) // NOT SURE THAT'S HOW IT WORKS-----------------------<<<
    .sort({ createdAt: -1 });

  res.status(200).json(playlists);
};
//GET SINGLE Playlist by id
const getPlaylist = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }

  const playlist = await Playlist.findById(id);
  //check if playlist by id exist (is not null)
  if (!playlist) {
    return res.status(404).json({ error: `playlist at id ${id} not found` });
  }
  res.status(200).json(playlist);
};
//CREATE new playlist
const createPlaylist = async (req, res) => {
  const { title, user_id, songs } = req.body; // ---------------------- remove user_id in body once tested again**
  //check fields filled?
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Playlist needs title.", emptyFields });
  }
  //add doc / model to DB
  try {
    // const user_id = req.user._id; --------------------------------------test again with from within app with auth**
    const playlist = await Playlist.create({ title, user_id, songs });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE a playlist
const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  const playlist = await Playlist.findOneAndDelete({ _id: id });
  if (!playlist) {
    return res.status(404).json({ error: `playlist at id ${id} not found` });
  }
  res.status(200).json(playlist);
};
//UPDATE a playlist
const updatePlaylist = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  //in update, use spread operator...to spread body fields inside request header
  const playlist = await Playlist.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!playlist) {
    return res.status(404).json({ error: `playlist at id ${id} not found` });
  }
  res.status(200).json(playlist);
};
//export routes
module.exports = {
  createPlaylist,
  getPlaylist,
  getPlaylists,
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
};
