import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function AddAlbumForm() {
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
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:4000/api/albumtest/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return result.data;
  }

  const submit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const result = await postImage({ title, artist, image: file });
    setImages([result.image, ...images]);
    //console.log(result);
    const json = await result.json;

    // navigate("/myalbum");

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
      navigate("/myalbum");
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App app">
      <h3 className="center">Add a new album</h3>

      <form onSubmit={submit}>
        <label htmlFor="title">Album Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          name="artist"
          id="artist"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          className={emptyFields.includes("artist") ? "error" : ""}
        />

        <label htmlFor="cover">Cover Picture:</label>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <div className="center">
          <button type="submit">Add New Album</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <div></div>
    </div>
  );
}

export default AddAlbumForm;
