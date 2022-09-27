import { useEffect, useState } from 'react'

// import  '../styles/home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useSongsContext } from "../hooks/useSongsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import AddSongFormContext from "../components/AddSongForm";
import MyAlbumComp from "../components/MyAlbumsHomePage";
import AllAlbumComp from "../components/AllAlbums";
import NavbarContext from "../components/NavbarHomePage";
import {useAlbum} from "../hooks/useAlbum";

//components
import SongsGrid from "../components/SongsGrid";

// const Home = () => {
//     const { songs, dispatch } = useSongsContext();
//     const { user } = useAuthContext();
//     const user_kk = JSON.parse(localStorage.getItem('user'))
//     let history = useNavigate();



function Home() {
    const [count, setCount] = useState(0);
    const { songs, dispatch } = useSongsContext();
    const { user } = useAuthContext();
    const user_kk = JSON.parse(localStorage.getItem('user'));
    const { setAlbum, error, isLoading } = useAlbum();

    useEffect (() => {
      setAlbum("63311427bdccce7aead4c6db");
    },[]
    )

    return (
    <div>
      <div> 
        <MyAlbumComp/>
        <AllAlbumComp/> 
      </div>
    </div>
        );
    };

    export default Home;
    //test 
    
      