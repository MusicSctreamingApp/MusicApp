const Song = require("../models/songModel");
const mongoose = require("mongoose");

// GET ALL songs
const getSongs = async (req, res) => {
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const songs = await Song.find().sort({ createdAt: -1 });

  res.status(200).json(songs);
};
// GET ALL ALBUM  songs
const getAlbumSongs = async (req, res) => {
  const { album_id } = req.params;
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const songs = await Song.find({ album_id: album_id }).sort({ createdAt: -1 });

  res.status(200).json(songs);
};
// GET ALL songs
const getPlaylistSongs = async (req, res) => {
  const { playlist_id } = req.params;
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const songs = await Song.find({ playlist_id: playlist_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(songs);
};
//GET SINGLE Song by id
const getSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }

  const song = await Song.findById(id);
  //check if song by id exist (is not null)
  if (!song) {
    return res.status(404).json({ error: `song at id ${id} not found` });
  }
  res.status(200).json(song);
};
//CREATE new song
const createSong = async (req, res) => {
  const { title, album_id, file_url } = req.body;

  let emptyFields = [];
  // TODO ***** ADJUST MODEL'S FIELDS ************************************************************
  if (!title) {
    emptyFields.push("title");
  }
  if (!album_id) {
    emptyFields.push("album_id");
  }
  if (!file_url) {
    emptyFields.push("file_url");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  //add doc / model to DB
  try {
    const song = await Song.create({ title, album_id, file_url });
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE a song
const deleteSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  const song = await Song.findOneAndDelete({ _id: id });
  if (!song) {
    return res.status(404).json({ error: `song at id ${id} not found` });
  }
  res.status(200).json(song);
};
//UPDATE a song
const updateSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  //in update, use spread operator...to spread body fields inside request header
  const song = await Song.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!song) {
    return res.status(404).json({ error: `song at id ${id} not found` });
  }
  res.status(200).json(song);
};
//export routes
module.exports = {
  createSong,
  getSong,
  getSongs,
  getAlbumSongs,
  getPlaylistSongs,
  deleteSong,
  updateSong,
};
