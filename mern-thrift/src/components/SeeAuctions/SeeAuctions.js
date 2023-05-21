import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "./SeeAuctions.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import axios from "axios"
import Navbar from "../../common/header/Navbar"


const SeeAuctions = ({userCart}) => {
  const [auctions, setAuctions] = useState([]);
  // const [imageSrc, setImageSrc] = useState('');
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }


  useEffect(() => {
    axios
      .get("http://localhost:9002/auctions")
      .then((response) => {
        console.log(response.data);
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  

  const remindMe = (announcementId) => {
    const token = localStorage.getItem("accessToken");

    axios
      .post(`http://localhost:9002/remindmeforauction/${announcementId}`, {token})
      .then((response) => {
        console.log(response.data);
        // Handle any success actions if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions if needed
      });
  };
  

  return (
    <>
    {
      auctions.map((announcement) => {
        // const imageSrc = `data:${productItem.contentType};base64,${productItem.data.toString('base64')}`;
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(productItem.data)));
        // const imageSrc = URL.createObjectURL(
        //   new Blob([announcement.data], { type: announcement.contentType })
        // );
        // localStorage.setItem("url", imageSrc);
      return(
            <div className='box'>
              <div className='product mtop'>
                <div className='img'>
                  <img id="flashcard-img" src={"./images/uploads/"+announcement.fileName} alt='' />
                  {/* <img id="flashcard-img" src={`data:image/png;base64,${base64String}`} alt="Uploaded" /> */}
                  <div className='product-like'>
                    <label>0</label> <br />
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{announcement.title}</h3>
                  <div className='desc'>
                    <h4>{announcement.description}</h4> 
                  </div>
                  <div className='price'>
                    <h4>{announcement.startingPrice}</h4> 
                  </div>
                  <div className='datetime'>
                    <h4>{new Date(announcement.startDate).toLocaleString()}</h4> 
                  </div>
                  <div className='datetime'>
                    <h4>{new Date(announcement.endDate).toLocaleString()}</h4> 
                  </div>
                  <div className='desc'>
                   <Link to={`/profile/${announcement.createdBy}`}>
                    <h4>{announcement.createdBy}</h4> 
                    </Link>
                  </div>
                
                  <button id="remindme" onClick={() => remindMe(announcement._id)}>
              Remind me
            </button>
                </div>
              </div>
            </div>)
            })
          }
        
            </>
          )
}

export default SeeAuctions