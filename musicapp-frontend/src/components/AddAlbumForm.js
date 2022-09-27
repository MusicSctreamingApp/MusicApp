
import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";

function AddAlbumForm() {
  // const { id } = useParams();
  //const albumId = id;
  let navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function postImage({ title, artist, image }) {
    const formData = new FormData();
    formData.append("title", title)
    formData.append("artist", artist)
    formData.append("image", image)

    const result = await axios.post('http://localhost:4000/api/albumtest/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      }
    })
    return result.data
  }


  const submit = async event => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const result = await postImage({ title, artist, image: file })
    setImages([result.image, ...images]);
    //console.log(result);
    const json = await result.json;

    if (!result) {
      setError(result.error);
      console.log(result.error);
      setEmptyFields(result.emptyFields);
      console.log(result.emptyFields);
    }
    if (result) {

      setEmptyFields([]);
      setTitle("");
      setArtist("");
      setFile("");
      setError(null);
      //dispatch({ type: "CREATE_SONG", payload: json });
      navigate(`/myalbums`);

    }


  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }


  return (
    <div className="App app">
      <h3 className="center" >Add a new album</h3>

      <form onSubmit={submit}>
        <label htmlFor="title">Album Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          name="artist"
          id="artist"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          className={emptyFields.includes("artist") ? "error" : ""}
        />

        <label htmlFor="cover">Cover Picture:</label>
        <input onChange={fileSelected} type="file" accept="image/*"></input>

        <div className="center">

          <button type="submit">Add New Album</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <div>


      </div>


    </div>
  );
}

export default AddAlbumForm;











// import React, { useRef } from 'react'
// import axios from 'axios'
// import { useState } from 'react';
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup';
// import styles from "../styles/MyAlbums.module.css";
// // import { useForm } from "react-hook-form";


// // need to sovle file upload validation
// function AddAlbumForm() {
//   let navigate = useNavigate();
//   const { user } = useAuthContext();
//   // const {register, handleSubmit}= useForm()
//   const fileRef = useRef(null);

//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [file, setFile] = useState();
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   const initialValues = {
//     title: "",
//     artist: "",
//     file: null,

//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().min(1).max(50).required("Title is required"),
//     artist: Yup.string().min(1).max(50).required("Artist is required"),
//     file: Yup
//       .mixed()

//       .nullable()
//     // .required("Cover is required")
//     // .test(
//     //   "FILE_SIZE",
//     //   "Uploaded file is too big.",
//     //   (value) => !value || (value && value.size <= 1024 * 1024)
//     // ),


//   });

//   async function postImage({ title, artist, image }) {
//     const formData = new FormData();
//     formData.append("title", title)
//     formData.append("artist", artist)
//     formData.append("image", image)

//     const result = await axios.post('http://localhost:4000/api/albumtest/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${user.token}`,
//       }
//     })

//     return result.data
//   }


//   const submit = async event => {
//     // event.preventDefault();

//     if (!user) {
//       setError("You must be logged in");
//       return;
//     }

//     const result = await postImage({ title, artist, image: file })
//     setImages([result.image, ...images]);


//     const json = await result.json;

//     if (!result) {
//       setError(result.error);
//       console.log(result.error);
//       setEmptyFields(result.emptyFields);
//       console.log(result.emptyFields);
//     }
//     if (result) {

//       setEmptyFields([]);
//       setTitle("");
//       setArtist("");
//       setFile("");
//       setError(null);
//       //dispatch({ type: "CREATE_SONG", payload: json });
//       navigate(`/myalbums`);

//     }


//   }

//   const fileSelected = event => {
//     const file = event.target.files[0];
//     setFile(file);
//   }


//   return (
//     <div className="App app">
//       <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
//         <div>
//           <h3 className="center" >Add a new album</h3>

//           <Form >
//             <div>
//               <label htmlFor="title">Album Title:</label>
//               <Field
//                 autoComplete="off"
//                 type="text"
//                 name="title"
//                 id="title"
//                 className={emptyFields.includes("title") ? "error" : ""}
//               />
//               <div>
//                 <ErrorMessage className={styles.error + ' text-end mb-2'} name="title" component="span" />
//               </div>
//             </div>

//             <div>

//               <label htmlFor="artist">Artist:</label>
//               <Field
//                 autoComplete="off"
//                 type="text"
//                 name="artist"
//                 id="artist"
//                 className={emptyFields.includes("artist") ? "error" : ""}
//               />
//               <div>
//                 <ErrorMessage className={styles.error + ' text-end mb-2'} name="artist" component="span" />
//               </div>
//             </div>
//             {/* <div>
//               <input ref={register} type="file" name="picture" />
//             </div> */}

//             <div>
//               <label htmlFor="cover">Cover Picture:</label>
//               <input
//                 ref={fileRef}
//                 type="file"
//                 name="file"
//                 accept="image/*"
//                 onChange={fileSelected} />
//               <div>
//                 <ErrorMessage className={styles.error + ' text-end mb-2'} name="file" component="span" />
//               </div>

//             </div>
//             <div className="center">

//               <button type="submit">Add New Album</button>
//             </div>
//             {error && <div className="error">{error}</div>}

//           </Form>
//         </div>


//       </Formik>

//     </div>
//   );
// }

// export default AddAlbumForm;



