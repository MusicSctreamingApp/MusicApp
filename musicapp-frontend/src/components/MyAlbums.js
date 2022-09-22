

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { useEffect, useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";

// const MyAlbums = () => {
//   const [users, setUser] = useState([]);
//   const { user } = useAuthContext();
//   const handleSideBarButtons = () => { };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       console.log(user);
//       const response = await fetch("/api/admin/", {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       const json = await response.json();

//       if (response.ok) {
//         setUser(json);
//       }
//     };
//     if (user) {
//       fetchUsers();
//     }
//   }, [setUser, user]);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <nav
//           id="sidebarMenu"
//           className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
//         >
//           <div className="position-sticky pt-3">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <a className="nav-link active" href="/AdminPanel">
//                   <span data-feather="home"></span>
//                   Dashboard
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className="nav-link"
//                   onClick={() => handleSideBarButtons()}
//                 >
//                   <span data-feather="file"></span>
//                   Users
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//           <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//             <h1 className="h2">Admin Panel</h1>
//           </div>
//           <h2>Users</h2>
//           <div className="table-responsive">
//             <table className="table table-striped table-sm">
//               <thead>
//                 <tr>
//                   <th scope="col">#id</th>
//                   <th scope="col">email</th>
//                   <th scope="col">role</th>
//                   <th scope="col">Edit</th>
//                   <th scope="col">Banned</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users &&
//                   users.map((users) => (
//                     <tr key={users._id}>
//                       <td>{users._id}</td>
//                       <td>{users.email}</td>
//                       <td>user role : {users.role}</td>
//                       <td>
//                         <button>Edit</button>
//                       </td>
//                       <td>
//                         <button>Delete / Ban </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MyAlbums;


import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
//import { useAlbumsContext } from "../hooks/useAlbumsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";


// not finish yet
function MyAlbums() {
  // const { user } = useAuthContext();

  // const [listOfAlbum, setListOfAlbum] = useState([]);
  // // let navigate = useNavigate();
  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/albumtest/all/',
  //     {
  //       headers: {

  //         Authorization: `Bearer ${user.token}`,
  //       }
  //     }
  //   ).then((response) => {
  //     setListOfAlbum(response.data);
  //   })
  // }, []);

  //const { albums, dispatch } = useAlbumsContext();


  // useEffect(() => {
  //   const fetchAlbums = async () => {
  //     const response = await fetch("/api/albums", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: "SET_ALBUMS", payload: json });
  //     }
  //   };
  //   if (user) {
  //     fetchAlbums();
  //   }
  // }, [dispatch, user]);


  return (
    <div className="App app ">



      <div>

        <Link className="button" to="/addalbum"> Add new Album</Link>
        <Link className="button" to="/myalbum"> My Album</Link>
        {/* <Link className="button" to="/addsong"> Add new Song</Link> */}
      </div>

      <div>
        <img src="https://spitifo.s3.amazonaws.com/images/5d6fbf19-71c0-4f32-b12f-15d25e418b99.PNG" alt="Pics" width="200" height="200" />
        {/* {listOfAlbum.map((val) => {
          let url = "https://spitifo.s3.amazonaws.com/" + val.cover;
          return (
            <image src={url} alt="Pics" width="200" height="300"></image>
          );
        })} */}

      </div>


    </div>
  );
}

export default MyAlbums;