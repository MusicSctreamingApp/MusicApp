//app declarations
const express = require("express");
//routing
const router = express.Router();
//routing to controllers
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createAdmin,
} = require("../controllers/usersController");
//authentication middleware for all admin routes
const requireAdmin = require("../middleware/requireAdmin");
router.use(requireAdmin); //Special AUTH also looking for ADMIN role
//routes
router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createAdmin);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);
module.exports = router;
