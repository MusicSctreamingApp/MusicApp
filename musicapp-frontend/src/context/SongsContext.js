import { createContext, useReducer, useEffect } from "react";
import { songsdata } from "../audio";
export const SongsContext = createContext();

export const songsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        songsdata: action.payload,
        // songsdata: songsdata,
      };
    // keeping create / delete in case we implement Playlists
    case "CREATE_SONG":
      return {
        songs: [action.payload, ...state.songs],
      };
    case "DELETE_SONG":
      return {
        songs: state.songs.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SongsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(songsReducer, {
    songsdata: null,
  });

  useEffect(() => {
    const songsdata = JSON.parse(localStorage.getItem("songsdata"));

    if (songsdata) {
      dispatch({ type: "SET_SONGS", payload: songsdata });
    }
  }, []);

  console.log("Songsdata:", state);

  return (
    <SongsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};
