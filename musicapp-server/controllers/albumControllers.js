const Album = require("../models/albumTest");
const mongoose = require("mongoose");
const express = require("express");


const { v4: uuidv4 } = require('uuid');
const fs = require('../s3')
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
const { uploadFile, getFileStream } = require('../s3')



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



// GET ALL songs
const getAlbums = async (req, res) => {

};
//GET SINGLE Song by id
const getAlbum = async (req, res) => {
  res.status(200).json(song);
};
//CREATE new song
const createAlbum = (upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile('images', file);
  await unlinkFile(file.path);
  console.log(result);

  const name = req.body.description;
  const cover = result.Location
  console.log(name);
  //res.send({ imagePath: `${result.Key}` });

  //add album to DB
  try {

    const album = await Album.create({ cover, name });
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});
//DELETE a song
const deleteAlbum = async (req, res) => {

  res.status(200).json(song);
};
//UPDATE a song
const updateAlbum = async (req, res) => {

  res.status(200).json(song);
};
//export routes
module.exports = {
  createAlbum,
  getAlbums,
  getAlbum,
  deleteAlbum,
  updateAlbum,
};


