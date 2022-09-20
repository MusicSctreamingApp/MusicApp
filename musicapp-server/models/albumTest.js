const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({

  cover: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("AlbumTest", albumSchema);