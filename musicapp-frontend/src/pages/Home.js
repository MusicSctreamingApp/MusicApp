import { useState } from 'react'
import imgs from './assets/1.jpg'
import  '../styles/home.css'

function App() {
  const [count, setCount] = useState(0)
  const list = [
    {
      value: "fdffdsf",
      label: "fdsffdsffdsffdsffdsffdsffdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    },
    {
      value: "fdsf",
      label: "dfdsfdfdsfdfdsfdfdsfdfdsf"
    }
  ];
  return (
    <div className="App">
      <div className='head'>
        <div className='box3'>
          <div className='title'>Good afternoon</div>
          <div className=' w10' > 
          <div className='btn'>Admin</div>
          </div>
        </div>
      </div>
      <div className='box mt-30'>
          <div className='item'>
            <img src={imgs} className="img1" />
            <div className='bg1 '>
              Album1
            </div>
          </div>
          <div className='item'>
            <img src={imgs} className="img1" />
            <div className='bg1 '>
              Album2
            </div>
          </div>
         <div className='item'>
            <img src={imgs} className="img1" />
            <div className='bg1 '>
              Album3
            </div>
          </div>
      </div>
      <div className='mt-50'>
        <div className='box3'>
          <div className='title'> Top</div>
          <div className='title2 w5'>See All</div>
        </div>
        <div className='box'>
          {list.map((item, idx) => (
            <div className='item2 bg2 '>
                <img src={imgs} className="img2" />
                <div>
                  <div className=' ft15 wb mt-10 '>
                    {item.value}
                  </div>
                  <div className='txt mt-10 vtxt1'>
                  {item.label}
                  </div>
                </div>
            </div>
            ))
          }         
        </div>
      </div>
      <div className='mt-50'>
        <div className='box3'>
          <div className='title'>Top </div>
          <div className='title2 m36'>See All</div>
        </div>
        <div className='box'>
          {list.map((item, idx) => (
            <div className='item2  '>
                <img src={imgs} className="img3" />
            </div>
            ))
          }         
        </div>
      </div>
      
    </div>
  )
}

export default App
