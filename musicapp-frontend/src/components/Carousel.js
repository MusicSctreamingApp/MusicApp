
import React from 'react'
import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";


// not finish yet
function MyAlbums() {

  let url = "https://spitifo.s3.amazonaws.com/";

  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

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

  const handleDelete = async (_id) => {
    // need to to delete all songs by album_Id first.

    const response = await fetch(`/api/album/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setAlbums(albums.filter((s) => s._id !== _id));
    } else {
      setError(json.error);
    }
  };


  return (

    <div className="App app ">
      <div>
        <Link className="button" to="/addalbum"> Add new Album</Link>

      </div>


      <div>

        {albums &&
          albums.map((album) => (
            <div>

              <Link className="button" to={"/myalbum/" + album._id}>
                <img src={url + album.cover} alt="Pics" width="200" height="200" />
              </Link>
              <button type="button" className="btn btn-warning" onClick={() => { handleDelete(album._id) }} >Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyAlbums;