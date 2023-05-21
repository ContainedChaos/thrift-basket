import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "./SeeAuctions.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link, useNavigate } from "react-router-dom"
import moment from 'moment'
import axios from "axios"
import Navbar from "../../common/header/Navbar"


const SeeAuctions = ({userCart}) => {
  const [auctions, setAuctions] = useState([]);
  // const [imageSrc, setImageSrc] = useState('');
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  const nav = useNavigate()


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

  const Bid = (auctionId) => {
    nav(`/placebid/${auctionId}`)
  };

  const getCurrentTime = () => {
    return new Date();
  };

  const renderStatus = (startDate, endDate) => {
    const currentTime = getCurrentTime();
    const auctionStart = new Date(startDate);
    const auctionEnd = new Date(endDate);
  
    if (auctionStart < currentTime && auctionEnd > currentTime) {
      return "Ongoing"
    } else if (auctionStart > currentTime) {
      return "Upcoming"
    }
    else if (auctionStart < currentTime && auctionEnd < currentTime) {
      return "Ended"
    }
  };
  

  return (
    <>
    {
      auctions.map((announcement) => {
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

                  
                
                  {renderStatus(announcement.startDate, announcement.endDate) === "Upcoming" && (
                  <button id="remindme" onClick={() => remindMe(announcement._id)}>
                    Remind me
                  </button>
                )}
                  {renderStatus(announcement.startDate, announcement.endDate) === "Ongoing" && (<button id="remindme" onClick={() => Bid(announcement._id)}>Bid</button>)}

            {renderStatus(announcement.startDate, announcement.endDate)}
                </div>
              </div>
            </div>)
            })
          }
        
            </>
          )
}

export default SeeAuctions