const Album = require("../models/albumTest");
const mongoose = require("mongoose");
const express = require("express");


const { v4: uuidv4 } = require('uuid');
const fs = require('../s3')
const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)
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


// GET ALL songs
const getAlbums = async (req, res) => {

};
//GET SINGLE Song by id
const getAlbum = async (req, res) => {
  res.status(200).json(song);
};
//CREATE new song

const createAlbum = (
  upload.single('image'),
  async (req, res) => {
    const file = req.file;
    console.log(req.files)
    console.log(file)

    const result = await uploadFile('images', file);
    // FIXME: what if results says there was an error?
    const res2 = await fs.unlinkFile(file.path);
    // await unlinkFile(file.path);
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


