const AlbumTest = require("../models/albumTest");
const mongoose = require("mongoose");

// const fs = require('fs')
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// const { uploadFile, getFileStream } = require('./s3')



// GET ALL songs
const getAlbums = async (req, res) => {

};
//GET SINGLE Song by id
const getAlbum = async (req, res) => {
  res.status(200).json(song);
};
//CREATE new song
const createAlbum = (upload.single('image'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.send("Ok");
  // const file = req.file
  // console.log(file)

  // apply filter
  // resize 

  // const result = await uploadFile(file)
  // await unlinkFile(file.path)
  // console.log(result)
  // const description = req.body.description
  // res.send({ imagePath: `/images/${result.Key}` })
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


