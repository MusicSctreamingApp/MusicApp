import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function AddAlbumForm() {
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState();
  // const [user_id, setUserId] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //async outside
  async function postImage({ title, artist, image }) {
    //param user_id deleted
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("image", image);
    // formData.append("user_id", user_id);

    //   const response = await fetch("/api/albumtest", {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }).then((res) => res.json());
    //   const json = await response.json();

    //   if (response.ok) {
    //     setImages(json);
    //   }
    // }

    const result = await axios.post("/api/albumtest/", formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  }
  // end async outside
  const submit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const result = await postImage({ title, artist, image: file });
    setImages([result.image, ...images]);
    const json = await result.json;

    if (!result) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (result.ok) {
      setEmptyFields([]);
      setTitle("");
      setArtist("");
      setFile("");
      setError(null);
      //dispatch({ type: "CREATE_SONG", payload: json });
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
        {/* <input
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
          type="text"
          placeholder="user_id"
        ></input> */}
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

// import { useState } from "react";
// import { useAlbumsContext } from "../hooks/useAlbumsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useParams } from "react-router-dom";
// import axios from 'axios';

// const AddAlbumForm = () => {
//   let { user_id } = useParams();
//   const { dispatch } = useAlbumsContext();
//   const { user } = useAuthContext();
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   // const [cover, setCover] = useState("");

//   const [file, setFile] = useState()
//   const [images, setImages] = useState([])

//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   async function postImage({ title, artist, image, user_id }) {
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("title", title);
//     formData.append("artist", artist)
//     formData.append("user_id", user_id)

//     const result = await axios.post('http://localhost:4000/api/albumtest/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
//     return result.data
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError("You must be logged in");
//       return;
//     }

//     const response = await postImage({ title, artist, image: file, user_id })
//     setImages([response.image, ...images])

//     // const response = await fetch("/api/songs", {
//     //   method: "POST",
//     //   body: JSON.stringify(song),
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Authorization: `Bearer ${user.token}`,
//     //   },
//     // });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//       setEmptyFields(json.emptyFields);
//     }
//     if (response.ok) {
//       setEmptyFields([]);
//       setTitle("");
//       setArtist("");
//       setFile("");
//       setError(null);
//       dispatch({ type: "CREATE_SONG", payload: json });
//     }
//   };

//   const fileSelected = event => {
//     const file = event.target.files[0]
//     setFile(file)
//   }

//   {/* <input
//         type="text"
//         name="cover"
//         id="cover"
//         onChange={(e) => setCover(e.target.value)}
//         value={cover}
//         className={emptyFields.includes("cover") ? "error" : ""}
//       /> */}

//   return (
//     <form onSubmit={handleSubmit} className="create">
//       <h3>Add a new album</h3>

//       <label htmlFor="title">Album Title:</label>
//       <input
//         type="text"
//         name="title"
//         id="title"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className={emptyFields.includes("title") ? "error" : ""}
//       />

//       <label htmlFor="artist">Artist:</label>
//       <input
//         type="text"
//         name="artist"
//         id="artist"
//         onChange={(e) => setArtist(e.target.value)}
//         value={artist}
//         className={emptyFields.includes("artist") ? "error" : ""}
//       />

//       <label htmlFor="cover">Excercise Reps:</label>
//       <input
//         onChange={fileSelected}
//         type="file"
//         accept="image/*"
//         className={emptyFields.includes("cover") ? "error" : ""}
//       ></input>

//       <button>Add Album</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default AddAlbumForm;
