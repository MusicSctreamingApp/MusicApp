import { useEffect, useState } from "react";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { songsdata } from "../audio";
import { useAlbum } from "../hooks/useAlbum";

//components

const Home = () => {
  const { setAlbum, error, isLoading } = useAlbum();
  const { songsdata, dispatch } = useSongsContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSongs = async () => {
      // setAlbum("632de123a714bdf38553ba12");
    };
    if (user) {
      fetchSongs();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="songs">
        {songsdata &&
          songsdata.map((song) => (
            <ul key={song._id}>
              <li>{song.title}</li>
              <li>
                <button>{song.file_url}</button>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Home;
