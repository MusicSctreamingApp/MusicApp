import { useState } from "react";
import { useSongsContext } from "./useSongsContext";

export const useAlbum = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useSongsContext();

  const playAlbum = async (album_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/songs/album/${album_id}`, {
      headers: { "Content-Type": "application/json" },
    });

    const albumSongs = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(albumSongs.error);
    }
    if (response.ok) {
      //save album's songs to local storage
      localStorage.setItem("songsdata", JSON.stringify(albumSongs));
      //update Songs Context
      dispatch({ type: "SET_SONGS", payload: albumSongs });
      setIsLoading(false);
    }
  };

  return { playAlbum, isLoading, error };
};
