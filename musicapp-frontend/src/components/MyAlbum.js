import React from 'react'
import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// not finish yet 
function MyAlbum() {
  const { id } = useParams();
  const album_id = id;


  const url = "https://spitifo.s3.amazonaws.com/";

  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCover = async () => {

      const response = await fetch(`/api/album/${album_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setAlbum(json);

      }
    };
    if (user) {
      fetchCover();
    }
  }, [setAlbum, user]);

  useEffect(() => {
    const fetchSongs = async () => {
      console.log(user);
      const response = await fetch(`/api/songs/album/${album_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setSongs(json);

      }
    };
    if (user) {
      fetchSongs();
    }
  }, [setSongs, user]);


  const handleDelete = async (_id) => {
    const response = await fetch(`/api/songs/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setSongs(songs.filter((s) => s._id !== _id));
    } else {
      setError(json.error);
    }
  };

  return (
    <div >

      <div>
      </div>
      <div className=" container mt-3">

        <h3 >All Songs In This Album</h3>
        <div className='underline'></div>
        <div className='row justify-content-center'>
          <div className='col-4'>
            {album &&
              <img src={url + album.cover} className="rounded mx-auto d-block" alt="Pics" width="200" height="200" />}
          </div>

          <div className='col-sm'>
            <table className="table table-striped table-hover">

              <tbody>
                {songs && songs.map((song) => {
                  return (

                    <tr>
                      <td> {song.title} </td>
                      <td>
                        <audio controls>
                          <source src={url + song.file_url} type="audio/mpeg"></source>
                          Your browser does not support the audio element.
                        </audio>
                      </td>

                      <td><button type="button" className="btn btn-warning" onClick={() => { handleDelete(song._id) }} >Delete</button>  </td>

                      {/* <td> <button type="button" className="btn btn-info" onClick={() => { navigate(`/updateSong/${song._id}`) }}>Update </button></td> */}

                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <Link className="btn btn-info" to={"/addsong/" + id}
              > Add new Song</Link>
            </div>
          </div>
        </div>

      </div>




    </div>
  );
}

export default MyAlbum;