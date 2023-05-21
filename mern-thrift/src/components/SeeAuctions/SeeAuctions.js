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
    <div className="drops-title-container">
        <h1 className="drops-title">Upcoming Auctions</h1>
      </div>
    <div className="see-announcements-container">
        <ul className="announcements-list">
    {
      auctions.map((announcement) => (
        <li key={announcement.id} className="announcement-item">
        <div className="drop">
          <div className="drop-img">
            <img
              id="drop-announcement-img"
              src={"./images/uploads/" + announcement.fileName}
              alt=""
            />
          </div>
                <div className='drop-details'>
                  <h3>{announcement.title}</h3>
                  <div className='desc'>
                    <h4>{announcement.description}</h4> 
                  </div>
                  <div className='price'>
                    <h4 className="price-range">Price Range: </h4>
                    <h4 className="price-range-value">BDT {announcement.startingPrice}</h4> 
                  </div>
                  <div className='datetime'>
                  <i className="fas fa-clock"></i>
                    <h4>{new Date(announcement.startDate).toLocaleString()}</h4> 
                  </div>
                  <div className='datetime'>
                  <i className="fas fa-clock"></i>
                    <h4>{new Date(announcement.endDate).toLocaleString()}</h4> 
                  </div>
                  <div className='desc'>
                   <Link to={`/profile/${announcement.createdBy}`}>
                    <h4 className="addedby"> Added by {announcement.createdBy}</h4> 
                    </Link>
                  </div>
                
                  <button className="remindme-button" onClick={() => remindMe(announcement._id)}>
              Remind me
            </button>
                </div>
              </div>
            </li>)
            )
          }
        </ul>
        </div>
            </>
          )
}

export default SeeAuctions