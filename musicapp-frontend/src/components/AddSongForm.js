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
  const [file, setFile] = useState([]);
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
    formData.append("image", image);

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

              <div className="form-group text-center">
                <button className="btn btn-warning btn-lg btn-block mt-4 mb-4" type="submit">Add</button>
              </div>
              {error && <div className="error">{error}</div>}
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AddSongForm;

// import { useState } from "react";
// import { useSongsContext } from "../hooks/useSongsContext";
// import { useAuthContext } from "../hooks/useAuthContext";

// const AddSongForm = () => {
//   const { dispatch } = useSongsContext();
//   const { user } = useAuthContext();
//   const [title, setTitle] = useState("");
//   const [load, setLoad] = useState("");
//   const [reps, setReps] = useState("");
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError("You must be logged in");
//       return;
//     }
//     const song = { title, load, reps };

//     const response = await fetch("/api/songs", {
//       method: "POST",
//       body: JSON.stringify(song),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//       setEmptyFields(json.emptyFields);
//     }
//     if (response.ok) {
//       setEmptyFields([]);
//       setTitle("");
//       setLoad("");
//       setReps("");
//       setError(null);
//       dispatch({ type: "CREATE_SONG", payload: json });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="create">
//       <h3>Add a new song</h3>

//       <label htmlFor="title">Excercise Title:</label>
//       <input
//         type="text"
//         name="title"
//         id="title"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className={emptyFields.includes("title") ? "error" : ""}
//       />

//       <label htmlFor="load">Excercise Load:</label>
//       <input
//         type="text"
//         name="load"
//         id="load"
//         onChange={(e) => setLoad(e.target.value)}
//         value={load}
//         className={emptyFields.includes("load") ? "error" : ""}
//       />

//       <label htmlFor="reps">Excercise Reps:</label>
//       <input
//         type="text"
//         name="reps"
//         id="reps"
//         onChange={(e) => setReps(e.target.value)}
//         value={reps}
//         className={emptyFields.includes("reps") ? "error" : ""}
//       />

//       <button>Add Song</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default AddSongForm;
