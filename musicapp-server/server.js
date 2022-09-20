require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/songs");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admins");
const albumRoutes = require("./routes/albums");
const playlistRoutes = require("./routes/playlists");
const app = express();

//middle ware logging out requests coming in
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/song", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/playlist", playlistRoutes);

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
