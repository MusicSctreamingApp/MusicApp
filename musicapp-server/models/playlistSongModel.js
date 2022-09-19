const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSongSchema = new Schema({
  song_id: {
    type: String,
    required: true,
  },
  playlist_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PlaylistSong", playlistSongSchema);
