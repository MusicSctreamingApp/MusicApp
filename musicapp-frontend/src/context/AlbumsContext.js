import { createContext, useReducer } from "react";

export const AlbumsContext = createContext();

export const albumReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALBUMS":
      return {
        albums: action.payload,
      };
    case "CREATE_ALBUM":
      return {
        albums: [action.payload, ...state.albums],
      };
    case "DELETE_ALBUM":
      return {
        albums: state.albums.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AlbumsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(albumReducer, {
    albums: null,
  });

  return (
    <AlbumsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AlbumsContext.Provider>
  );
};
