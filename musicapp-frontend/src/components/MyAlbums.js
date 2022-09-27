
import React from 'react'
import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/MyAlbums.module.css";


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
    <div className={styles.try} >
      <div className={styles.myalbum + ' row'}>
        <h1 className={styles.text + ' text-center'}>My Albums</h1>
        <h5 className="font-monospace text-center fst-italic text-light">The home of sharing music. Enjoy a steady flow of great hit music</h5>
        <Link className={styles.link + ' ' + styles.text + ' text-center' + ' fw-bold fs-5'} to="/addalbum"> Add new Album</Link>

      </div>

      <div className={styles.myalbumpic + ' ' + styles.try} >


        <div>
          <div className='m-4'>

            <div className="row">

              {albums &&
                albums.map((album) => (

                  <div className={'col-4'}>

                    <div className={styles.cardbox + ' card mb-4 '}>
                      <div className={styles.pcontainer}>
                        <img src={url + album.cover} alt="Pics" className={'card-img-top ' + styles.albumpic} width="200" height="200" />
                        <Link className={styles.link} to={"/myalbum/" + album._id}>

                          <div className={styles.middle}>
                            <div className={styles.clickalbum}>{album.title}</div>
                          </div>
                        </Link>
                      </div>

                      <div className="card-body p-1 ">
                        <div className="row mx-0">
                          <h5 className="card-title col mb-0 align-middle mt-3 ms-0">{album.title}</h5>
                          <button type="button" title="Delete" className={'btn  btn-light col-2  fw-normal ' + styles.btndel} onClick={() => { handleDelete(album._id) }} ><span className='fs-3'>-</span></button>

                        </div>

                      </div>
                    </div>


                  </div>


                ))}
            </div>

          </div>

        </div>


      </ div>
    </div>
  );
}

export default MyAlbums;