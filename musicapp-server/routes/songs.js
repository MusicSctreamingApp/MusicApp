//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  createSong,
  getSongs,
  getSong,
  deleteSong,
  updateSong,
} = require("../controllers/songControllers");
//authentication middleware for all song routes
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth); //MAYBE NEED TO CHANGE SOME ROUTES WITHTOUT AUTH
//routes
router.get("/", getSongs);

router.get("/:id", getSong);

router.post("/", createSong);

router.delete("/:id", deleteSong);

router.patch("/:id", updateSong);
module.exports = router;
