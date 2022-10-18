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
//router.use(requireAuth); //MAYBE NEED TO CHANGE SOME ROUTES WITHTOUT AUTH
//routes
router.get("/all", getAlbums);

router.get("/user", requireAuth, getUserAlbums);

router.get("/:id", requireAuth, getAlbum);

router.post("/", requireAuth, createAlbum);

router.delete("/:id", requireAuth, deleteAlbum);

router.patch("/:id", requireAuth, updateAlbum);
module.exports = router;
