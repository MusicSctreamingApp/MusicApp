import { useState } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddSongForm = () => {
  const { dispatch } = useSongsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const song = { title, load, reps };

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
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_SONG", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a new song</h3>

      <label htmlFor="title">Excercise Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label htmlFor="load">Excercise Load:</label>
      <input
        type="text"
        name="load"
        id="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label htmlFor="reps">Excercise Reps:</label>
      <input
        type="text"
        name="reps"
        id="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddSongForm;
