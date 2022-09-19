const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  //TEST with ref id instead of push into empty array
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("Album", albumSchema);
