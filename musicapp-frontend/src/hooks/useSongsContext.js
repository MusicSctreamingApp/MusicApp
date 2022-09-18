import { SongsContext } from "../context/SongsContext";
import { useContext } from "react";

export const useSongsContext = () => {
  const context = useContext(SongsContext);

  if (!context) {
    throw Error("useSongsContext must be used inside of SongsContextProvider");
  }

  return context;
};
