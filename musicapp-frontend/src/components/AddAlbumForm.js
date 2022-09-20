import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';



async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post('http://localhost:4000/api/albumtest/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return result.data
}




function AddAlbumForm() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [urls, setUrls] = useState([])

  // useEffect(() => {
  //   axios.get("http://localhost:4000/api/albumtest/all").then((response) => {
  //     setUrls(response.data);
  //   })
  // }, []);


  const submit = async event => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }


  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        {urls.map((val) => (
          <div >
            <img src={val.cover}></img>
          </div>
        )
        )
        }

      </div>



    </div>
  );
}

export default AddAlbumForm;
