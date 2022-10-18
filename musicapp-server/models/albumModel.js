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
albumSchema.statics.addAlbum = async function (title, artist, cover, user_id) {
  if (!title || !artist || !cover) {
    throw Error("All fields must be filled");
  }
  const album = await this.create({ title, artist, cover, user_id });
  return album;
};

module.exports = mongoose.model("Album", albumSchema);
