import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AddSongFormContext from "../components/AddSongForm";

//components
import SongsGrid from "../components/SongsGrid";

const Home = () => {
  const { songs, dispatch } = useSongsContext();
  const { user } = useAuthContext();

  const user_kk = JSON.parse(localStorage.getItem('user'))

  let history = useNavigate();

  useEffect(() => {
<<<<<<< Updated upstream
    const fetchSongs = async () => {
      const response = await fetch("/api/songs", {
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
=======
<<<<<<< Updated upstream
    // const fetchSongs = async () => {
    //   const response = await fetch("/api/songs", {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   });
    //   const json = await response.json();
    //   if (response.ok) {
    //     dispatch({ type: "SET_SONGS", payload: json });
    //   }
    // };
    // if (user) {
    //   fetchSongs();
    // }
=======
    if(null === user.token){
      const fetchSongs = async () => {
        // Everyone can browsing the music
        const response = await fetch("/api/songs");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_SONGS", payload: json });
        }
      }
    }else{
      const fetchSongs = async () => {
        const response = await fetch("/api/songs", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_SONGS", payload: json });
        }
      };
      
      // Login user
      if (user_kk) {
        // Regular user
        if (user_kk.user.role === "USER") {
          fetchSongs();
        }else{
          // Admin
          history("/");
        }
      }
    }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  }, [dispatch, user]);


  return (
    // <div className="home">
    //   <div className="songs">
    //     {songs && songs.map((song) => <SongsGrid key={song._id} song={song} />)}
    //   </div>
    // </div>
    <div className="home">
      <div className="songs">
        {songs && songs.map((song) => <SongsGrid key={song._id} song={song} />)}
      </div>
=======
<<<<<<< Updated upstream
    // <div className="home">
    //   <div className="songs">
    //     {songs && songs.map((song) => <SongsGrid key={song._id} song={song} />)}
    //   </div>
    // </div>
    <div className="home">
      <div className="songs">Hello</div>
=======
   
    <div className="home">
      <div className="songs"> 
        {user_kk.user.role === 'ADMIN' ? <Link to="/"> Create A Post</Link> : ""}
        <AddSongFormContext/>
        {songs && songs.map((song) => <SongsGrid key={song._id} song={song} />)}
      </div>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    </div>
  );
};


export default Home;
