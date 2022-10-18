import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function AddSongForm() {
  const { id } = useParams();
  const albumId = id;
  let navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  async function postImage({ title, albumId, image }) {
    if (!title || !image) {
      setError("input all fields");
      return;
    }
    if (!albumId) {
      setError("Album not found.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("albumId", albumId);
    formData.append("image", file);

    const result = await axios.post(
      "http://localhost:4000/api/createsong/",
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
    if (!title || !file) {
      setError("All fields must be filled");
      return;
    }

    const result = await postImage({ title, albumId, image: file });
    setImages([result.image, ...images]);
    //console.log(result);
    const json = await result.json;
    console.log(json);
    // navigate("/myalbum");

    if (!result) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (result) {
      setEmptyFields([]);
      setTitle("");
      setFile("");
      setError(null);
      //dispatch({ type: "CREATE_SONG", payload: json });
      navigate(`/myalbum/${albumId}`);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="col-lg-12 col-xl-5 m-auto">

      <div class=" card text-black  bg-light bg-gradient">
        <div class="col">


          <h3 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add a new song</h3>

          <form className="mx-1 mx-md-4 " onSubmit={submit}>
            <div class="form-group">

              <label className="form-label" htmlFor="title">Song Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : "" + " form-control mb-2"}
              />

              <label className="form-label" htmlFor="song">Song:</label>
              <input
                onChange={fileSelected}
                type="file"
                accept="audio/*"
                className={emptyFields.includes("title") ? "error" : "" + " form-control mb-2"}
              ></input>

              {error && <div className="error">{error}</div>}

              <div className="form-group text-center">
                <button className="btn btn-warning btn-lg btn-block mt-4 mb-4" type="submit">Add</button>
              </div>

            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AddSongForm;

