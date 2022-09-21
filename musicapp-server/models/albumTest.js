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

});


module.exports = mongoose.model("AlbumTest", albumSchema);