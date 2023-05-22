import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "./SeeAuctions.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link, useNavigate } from "react-router-dom"
import moment from 'moment'
import axios from "axios"
import Navbar from "../../common/header/Navbar"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        toast.success(response.data.data);
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
    <div className="drops-title-container">
        <h1 className="drops-title">Auctions</h1>
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
                    <h4>{new Date(announcement.startDate).toLocaleString()} to</h4> 
                  </div>
                  <div className='datetime'>
                  <i className="fas fa-clock"></i>
                    <h4>{new Date(announcement.endDate).toLocaleString()}</h4> 
                  </div>
                  <div className='desc'>
                   <Link to={`/profile/${announcement.createdBy}`}>
                    <h4 className="addedby"> Added by <span>{announcement.createdBy}</span></h4> 
                    </Link>
                  </div>
                  <div className="status">
                  {renderStatus(announcement.startDate, announcement.endDate) === "Ongoing" && (<p className="ongoing">{renderStatus(announcement.startDate, announcement.endDate)}</p>)}
                  {renderStatus(announcement.startDate, announcement.endDate) === "Upcoming" && (<p className="upcoming">{renderStatus(announcement.startDate, announcement.endDate)}</p>)}
                  </div>
                  {renderStatus(announcement.startDate, announcement.endDate) === "Ongoing" && (<button className="remindme-button" onClick={() => Bid(announcement._id)}>Bid</button>)}
                  {renderStatus(announcement.startDate, announcement.endDate) === "Upcoming" && (<button className="remindme-button" onClick={() => remindMe(announcement._id)}>Remind me</button>)}
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