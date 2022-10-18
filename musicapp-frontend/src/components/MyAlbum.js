import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "../styles/MyAlbums.module.css";


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
      <div className={styles.mysong + ' container mt-3 px-0'}>

        <div className={styles.myalbum + ' row mx-0'}>
          <h1 className={styles.text + ' text-center fst-italic'}>My Album</h1>
          <h5 className="font-monospace text-center fst-italic text-light">Blending elements of lounge, surf, latin, jazz, and Hawaiian music</h5>
          <Link className={styles.link + ' ' + styles.text + ' text-center' + ' fw-bold fs-5'} to={"/addsong/" + id}> Add new song</Link>

        </div>


        <div className='row justify-content-left mt-3 mx-0'>
          <div className='col-4'>
            {album &&
              <img src={url + album.cover} className="rounded mx-auto d-block" alt="Pics" width="200" height="200" />}
          </div>

          <div className='col-sm px-0 mx-0'>
            <table className="table table-striped table-hover mx-0">

              <tbody>
                {/* just for displaying song when no user adding songs*/}
                <tr >
                  <td> Normal Song </td>
                  <td>
                    <audio controls>
                      <source src={url + "songs/60043bb1-dbf2-4d68-958b-e8ce4700da26.mp3"} type="audio/mpeg"></source>
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>
                <tr >
                  <td> Normal Song </td>
                  <td>
                    <audio controls>
                      <source src={url + "songs/60043bb1-dbf2-4d68-958b-e8ce4700da26.mp3"} type="audio/mpeg"></source>
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>
                <tr >
                  <td> Normal Song </td>
                  <td>
                    <audio controls>
                      <source src={url + "songs/60043bb1-dbf2-4d68-958b-e8ce4700da26.mp3"} type="audio/mpeg"></source>
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>
                <tr >
                  <td> Normal Song </td>
                  <td>
                    <audio controls>
                      <source src={url + "songs/60043bb1-dbf2-4d68-958b-e8ce4700da26.mp3"} type="audio/mpeg"></source>
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>

                {songs &&
                  songs.map((song) => {
                    return (
                      <tr >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAlbum;
