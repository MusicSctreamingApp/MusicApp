require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const mongoose = require("mongoose");

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
  }
})
const upload = multer({ storage })

const { uploadFile, getFileStream } = require('./s3')

const workoutRoutes = require("./routes/songs");
const userRoutes = require("./routes/users");
const albumTestRoutes = require("./routes/albumTestRoutes");
const app = express();


//middle ware logging out requests coming in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/songs", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/albumtest", upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile('images', file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  console.log(description);
  res.send({ imagePath: `${result.Key}` });
});

//connect to database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, (req, res) => {
      console.log("connected to DB and listening on port 4000!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
