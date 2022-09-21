const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album_id: {
    type: String,
    required: true,
  },
  playlist_id: {
    type: String,
  },
  file_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Song", songSchema);
