
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
//import { useAlbumsContext } from "../hooks/useAlbumsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";


// not finish yet
function MyAlbums() {

  let url = "https://spitifo.s3.amazonaws.com/";

  const [albums, setAlbums] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(user);
      const response = await fetch("/api/album/all", {
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

    <div className="App app ">
      <div>
        <Link className="button" to="/addalbum"> Add new Album</Link>
        <Link className="button" to="/myalbum"> My Album</Link>
        {/* <Link className="button" to="/addsong"> Add new Song</Link> */}
      </div>


      <div>

        {albums &&
          albums.map((album) => (
            <Link className="button" to={"/myalbum/" + album._id}>
              <img src={url + album.cover} alt="Pics" width="200" height="200" />
            </Link>


          ))}

      </div>


    </div>
  );
}

export default MyAlbums;