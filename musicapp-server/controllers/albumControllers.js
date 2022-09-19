const Album = require("../models/albumModel");
const mongoose = require("mongoose");

// GET ALL albums
const getAlbums = async (req, res) => {
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const albums = await Album.find().sort({ createdAt: -1 });

  res.status(200).json(albums);
};
// GET USER'S albums
const getUserAlbums = async (req, res) => {
  const user_id = req.user._id;
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const albums = await Album.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(albums);
};
//GET SINGLE Album by id
const getAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }

  const album = await Album.findById(id);
  //check if album by id exist (is not null)
  if (!album) {
    return res.status(404).json({ error: `album at id ${id} not found` });
  }
  res.status(200).json(album);
};
//CREATE new album
const createAlbum = async (req, res) => {
  const { title, cover, artist, user_id } = req.body; // Should get user_id from AuthContext **

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!cover) {
    emptyFields.push("cover");
  }
  if (!artist) {
    emptyFields.push("artist");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  //add doc / model to DB
  try {
    // const user_id = req.user._id; //Re-test with user in App ------------------------------------------------**
    const album = await Album.create({ title, cover, artist, user_id });
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE a album
const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  const album = await Album.findOneAndDelete({ _id: id });
  if (!album) {
    return res.status(404).json({ error: `album at id ${id} not found` });
  }
  res.status(200).json(album);
};
//UPDATE a album
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  //in update, use spread operator...to spread body fields inside request header
  const album = await Album.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!album) {
    return res.status(404).json({ error: `album at id ${id} not found` });
  }
  res.status(200).json(album);
};
//export routes
module.exports = {
  createAlbum,
  getUserAlbums,
  getAlbum,
  getAlbums,
  deleteAlbum,
  updateAlbum,
};
