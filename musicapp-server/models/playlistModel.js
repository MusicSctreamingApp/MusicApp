const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);
