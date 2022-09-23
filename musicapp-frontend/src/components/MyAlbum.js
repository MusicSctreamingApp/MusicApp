import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// not finish yet 
function MyAlbum() {
  let { id } = useParams();

  const [listOfSong, setlistOfSong] = useState([]);
  const deleteSong = (id) => { }


  return (
    <div >

      <div>
        <Link className="button" to={"/addsong/" + id}
        > Add new Song</Link>
      </div>
      <div className=" container mt-3">

        <h3 >All Songs</h3>
        <div className='underline'></div>

        <table className="table table-striped table-hover">

          <tbody>
            {listOfSong.map((val) => {
              return (

                <tr>
                  <td> {val.title} </td>
                  <td> {val.file_url} </td>
                  <td> {val.file_url} </td>


                  {/* <td c><button type="button" className="btn btn-warning" onClick={() => { deleteSong(val.id) }} >Delete</button>  </td>
                  <td> <button type="button" className="btn btn-info" onClick={() => { navigate(`/updateTodo/${val.id}`) }}>Update </button></td> */}

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>




    </div>
  );
}

export default MyAlbum;