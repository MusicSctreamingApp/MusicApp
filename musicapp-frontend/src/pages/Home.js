import { useEffect } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import SongsGrid from "../components/SongsGrid";

const Home = () => {
  const { songs, dispatch } = useSongsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/song/all", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SONGS", payload: json });
      }
    };
    if (user) {
      fetchSongs();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="songs">
        {songs && songs.map((song) => <SongsGrid key={song._id} song={song} />)}
      </div>
    </div>
  );
};

export default Home;
