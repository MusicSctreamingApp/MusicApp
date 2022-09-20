const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    //create JWT
    const token = createToken(user._id);
    //send response with email and token
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    //create JWT
    const token = createToken(user._id);
    //send response with email and token
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
//GET SINGLE user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }

  const user = await User.findById(id);
  //check if user by id exist (is not null)
  if (!user) {
    return res.status(404).json({ error: `User at id ${id} not found` });
  }
  res.status(200).json(user);
};
//CREATE new admin
const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    //update role
    const admin = await User.findOneAndUpdate(
      { _id: user._id },
      {
        email: user.email,
        password: user.password,
        role: "ADMIN",
      }
    );
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE a user //MAYBE CHANGE TO BAN USER?????????????????????????
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: `user at id ${id} not found` });
  }
  res.status(200).json(user);
};
//UPDATE a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "invalid ID" });
  }
  //in update, use spread operator...to spread body fields inside request header
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(404).json({ error: `user at id ${id} not found` });
  }
  res.status(200).json(user);
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  createAdmin,
};
