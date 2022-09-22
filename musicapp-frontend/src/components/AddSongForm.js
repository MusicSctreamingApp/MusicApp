import { useState } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddSongForm = () => {
  const { dispatch } = useSongsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [album_id, setAlbumId] = useState("");
  const [file_url, setFileURL] = useState("");
  const [playlist_id, setPlaylistID] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    // const song = { title, load, reps };
    const song = { title, album_id,file_url, playlist_id };
    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setAlbumId("");
      setFileURL("");
      setPlaylistID("");
      setError(null);
      dispatch({ type: "CREATE_SONG", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a new song</h3>

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

      <button>Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddSongForm;
