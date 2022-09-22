const Song = require("../models/songModel");
const PlayList = require("../models/playlistModel");
const mongoose = require("mongoose");

// GET ALL songs
const getSongs = async (req, res) => {
<<<<<<< Updated upstream
  const user_id = req.user._id;
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
  //the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
  const songs = await Song.find().sort({ createdAt: -1 });
=======
  const user_id = req.user._id;
  console.log(user_id);
  /**
   * 1、Check if user_id is null
   * 2、if null then findAll（）
   * 3、Otherwise find({"userid":user_id})
   */
   const songs = [];
  if (user_id === null) {
    
//the find method CAN be FILTERED...or sorted: here createdAt: -1 = Desc
    // songs = await Song.find().sort({ createdAt: -1 });
    songs = await Song.find();
    console.log(songs);
  }else{
    // Based on UserID to get all the songs under this user 
    /**
     * 1、Based on the userId to check PayList and get the list of Songs
     * 2、Based on the songs to check the Songs and get SongInfo
     */
    // const playList  = await PlayList.find({userid : user_id}).sort({ createdAt: -1 });
    const playList  = await PlayList.find({userid : user_id});
    console.log(playList);
    const songList = playList.getSongs;
    console.log(songList);
    songs = await Song.find({_id:{$in:[songList]}});
    // songs = await Song.find({_id:{$in:[songList]}}).sort({ createdAt: -1 });
    console.log(songs);
  }
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  const { title, load, reps } = req.body;
=======
<<<<<<< Updated upstream
  const { title, album_id, file_url } = req.body;
=======
  // const { title, load, reps } = req.body;
  const { title, album_id,file_url, playlist_id } = req.body;

>>>>>>> Stashed changes
>>>>>>> Stashed changes

  let emptyFields = [];
  // TODO ***** ADJUST MODEL'S FIELDS ************************************************************
  if (!title) {
    emptyFields.push("title");
  }
<<<<<<< Updated upstream
  if (!load) {
    emptyFields.push("load");
=======
  if (!album_id) {
    emptyFields.push("album_id");
<<<<<<< Updated upstream
  }
  if (!file_url) {
    emptyFields.push("file_url");
=======
>>>>>>> Stashed changes
  }
  if (!file_url) {
    emptyFields.push("file_url");
  }
<<<<<<< Updated upstream
=======
  if (!playlist_id) {
    emptyFields.push("playlist_id");
>>>>>>> Stashed changes
  }
  //add sending audio file to the S3 here
>>>>>>> Stashed changes
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  //add doc / model to DB
  try {
<<<<<<< Updated upstream
    const user_id = req.user._id;
    const song = await Song.create({ title, load, reps, user_id });
=======
<<<<<<< Updated upstream
    const song = await Song.create({ title, album_id, file_url });
=======
    const user_id = req.user._id;
    // const song = await Song.create({ title, load, reps, user_id });
    const song = await Song.create({ title, album_id, file_url, playlist_id});
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
