const express = require("express");
//routing
const router = express.Router();
//controller functions
const {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const requireAuth = require("../middleware/requireAuth");
//login
router.post("/login", loginUser);


//signup
router.post("/signup", signupUser);
//Trying to use middleware in only certain routes for user here
router.patch("/:id", requireAuth, updateUser);

router.delete("/:id", requireAuth, deleteUser);

module.exports = router;
