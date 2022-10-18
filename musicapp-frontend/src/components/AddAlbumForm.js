
import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MyAlbums.module.css";
//import { useParams } from "react-router-dom";

function AddAlbumForm() {
  // const { id } = useParams();
  //const albumId = id;
  let navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function postImage({ title, artist, image }) {
    const formData = new FormData();
    formData.append("title", title)
    formData.append("artist", artist)
    formData.append("image", image)

    const result = await axios.post('http://localhost:4000/api/albumtest/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      }
    })
    return result.data
  }


  const submit = async event => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    if (!title || !artist || !file) {
      setError("All fields must be filled");
      return;
    }

    const result = await postImage({ title, artist, image: file })
    setImages([result.image, ...images]);
    //console.log(result);
    const json = await result.json;

    if (!result) {
      setError(result.error);
      console.log(result.error);
      setEmptyFields(result.emptyFields);
      console.log(result.emptyFields);
    }
    if (result) {

      setEmptyFields([]);
      setTitle("");
      setArtist("");
      setFile("");
      setError(null);
      //dispatch({ type: "CREATE_SONG", payload: json });
      navigate(`/myalbums`);

    }


  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className="col-lg-12 col-xl-5 m-auto">


      <div class=" card text-black  bg-light bg-gradient">
        <div class="col">


          <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" >Add a new album</h3>

          <form className="mx-1 mx-md-4 " onSubmit={submit}>
            <div class="form-group">
              <label className="form-label" htmlFor="title">Album Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : "" + " form-control mb-2"}
              />

              <label className="form-label" htmlFor="artist">Artist:</label>
              <input
                type="text"
                name="artist"
                id="artist"
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
                className={emptyFields.includes("artist") ? "error" : "" + " form-control mb-2"}
              />

              <label className="form-label" htmlFor="cover">Cover Picture:</label>
              <input onChange={fileSelected} type="file" accept="image/*" className="form-control mb-2"></input>
              {error && <div className="error">{error}</div>}

              <div className="form-group text-center">

                <button type="submit" className="btn btn-warning btn-lg btn-block mt-4 mb-4">Add</button>
              </div>

            </div>
          </form>
          <div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAlbumForm;

