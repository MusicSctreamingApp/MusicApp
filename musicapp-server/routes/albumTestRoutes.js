//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  createAlbum,
  getAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
} = require("../controllers/albumControllers");
//authentication middleware for all song routes
// const requireAuth = require("../middleware/requireAuth");
// router.use(requireAuth);

router.get("/", getAlbums);

router.get("/:id", getAlbum);

router.post("/", createAlbum);

router.delete("/:id", deleteAlbum);


router.patch("/:id", updateAlbum);
module.exports = router;
