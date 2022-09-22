//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  createPlaylist,
  getUserPlaylists,
  getPlaylists,
  getPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require("../controllers/playlistControllers");
//authentication middleware for all playlist routes
// const requireAuth = require("../middleware/requireAuth");
// router.use(requireAuth); //MAYBE NEED TO CHANGE SOME ROUTES WITHTOUT AUTH
//routes
router.get("/all", getPlaylists);

router.get("/user", getUserPlaylists);

router.get("/:id", getPlaylist);

router.post("/", createPlaylist);

router.delete("/:id", deletePlaylist);

router.patch("/:id", updatePlaylist);
module.exports = router;
