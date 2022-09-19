//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  createAlbum,
  getUserAlbums,
  getAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
} = require("../controllers/albumControllers");
//authentication middleware for all album routes
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth); //MAYBE NEED TO CHANGE SOME ROUTES WITHTOUT AUTH
//routes
router.get("/all", getAlbums);

router.get("/user", getUserAlbums);

router.get("/:id", getAlbum);

router.post("/", createAlbum);

router.delete("/:id", deleteAlbum);

router.patch("/:id", updateAlbum);
module.exports = router;
