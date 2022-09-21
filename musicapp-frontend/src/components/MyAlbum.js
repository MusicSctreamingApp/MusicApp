import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// not finish yet 
function MyAlbum() {
  return (
    <div className="App app ">





      <Link className="button" to="/addalbum"> Add new Album</Link>



      <Link className="button" to="/addsong"> Add new Song</Link>


    </div>
  );
}

export default MyAlbum;