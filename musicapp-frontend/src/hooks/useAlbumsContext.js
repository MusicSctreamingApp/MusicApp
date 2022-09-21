import { AlbumsContext } from "../context/AlbumsContext";
import { useContext } from "react";

export const useAlbumsContext = () => {
  const context = useContext(AlbumsContext);

  if (!context) {
    throw Error("useAlbumsContext must be used inside of AlbumsContextProvider");
  }

  return context;
};
