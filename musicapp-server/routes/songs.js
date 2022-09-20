//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  createSong,
  getSongs,
  getSong,
  getAlbumSongs,
  getPlaylistSongs,
  deleteSong,
  updateSong,
} = require("../controllers/songControllers");
//authentication middleware for all song routes
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth); //MAYBE NEED TO CHANGE SOME ROUTES WITHTOUT AUTH
//routes
router.get("/all", getSongs);

router.get("/album/:album_id", getAlbumSongs);

router.get("/playlist/:playlist_id", getPlaylistSongs);

router.get("/:id", getSong);

router.post("/", createSong);

router.delete("/:id", deleteSong);

router.patch("/:id", updateSong);
module.exports = router;
