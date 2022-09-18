import { createContext, useReducer } from "react";

export const SongsContext = createContext();

export const songsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        songs: action.payload,
      };
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
    songs: null,
  });

  return (
    <SongsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};
