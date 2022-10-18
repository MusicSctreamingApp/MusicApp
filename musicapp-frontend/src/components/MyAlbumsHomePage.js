import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAlbum } from "../hooks/useAlbum";
import { FaPlay } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/home.css";


function MyAlbums() {
  let url = "https://spitifo.s3.amazonaws.com/";

  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { playAlbum } = useAlbum();

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(user);
      const response = await fetch("/api/album/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setAlbums(json);
      }
    };
    if (user) {
      fetchAlbums();
    }
  }, [setAlbums, user]);


  return (
    <div className="container">
      <div className="App">
        <div className="mt-50">
          <div className="box3">
            <div className="h2"> Uniquely yours</div>
            <div className="title2 w5"></div>
          </div>
          <div className="box">
            {albums &&
              albums.map((album) => (
                <div className="item2 bg2" key={album._id}>
                  <div className="playAlbum">
                    {/* <div className="play">
                      <FaPlay
                        className="playMe"
                        onClick={() => playAlbum(album._id)}
                      />
                    </div> */}
                    <Link className="" to={"/myalbum/" + album._id}>
                      <img src={url + album.cover} className="img2" />
                      <div>
                        <div className=" ft15 wb mt-10 ">{album.title}</div>
                        <div className="txt mt-10 vtxt1">{album.artist}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbums;
