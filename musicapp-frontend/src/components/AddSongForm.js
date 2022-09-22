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
  const [album_id, setAlbumId] = useState("");
  const [file_url, setFileURL] = useState("");
  const [playlist_id, setPlaylistID] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);

  async function postImage({ title, albumId, image }) {
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
    // const song = { title, load, reps };
    const song = { title, album_id, file_url, playlist_id };
    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // navigate("/myalbum");

    if (!response.ok) {
      setError(json.error);
      console.log(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setAlbumId("");
      setFileURL("");
      setPlaylistID("");
      setError(null);
      //dispatch({ type: "CREATE_SONG", payload: json });
      navigate(`/myalbum/${albumId}`);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFileURL(file);
  };

  return (
    <div className="App app">
      <h3 className="center">Add a new song</h3>
      <form>
        <label htmlFor="title">Title of the Song:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        {/* <label htmlFor="Album_id">Album:</label>
      <input
        type="text"
        name="album"
        id="album"
        onChange={(e) => setAlbumId(e.target.value)}
        value={album_id}
        className={emptyFields.includes("albumID") ? "error" : ""}
      /> 
 
      <label htmlFor="reps">PlayList:</label>
      <input
        type="text"
        name="reps"
        id="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />  */}

        <label htmlFor="song">Song:</label>
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
