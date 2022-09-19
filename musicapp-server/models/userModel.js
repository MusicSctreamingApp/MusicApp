const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const alreadyExists = await this.findOne({ email });
  if (alreadyExists) {
    throw Error("Email already in use");
  }
  //create hashed password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //create document inside database
  const user = await this.create({ email, password: hash, role: "USER" });
  return user;
};
//login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User email does not exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
