import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import "./SeeAnnouncements.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SeeAnnouncements = ({ userCart }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9002/announcements")
      .then((response) => {
        console.log(response.data);
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);  

  const remindMe = (announcementId) => {
    const token = localStorage.getItem("accessToken");

    axios
      .post(`http://localhost:9002/remindme/${announcementId}`, {token})
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions if needed
      });
  };
  

  return (
    <>
    <div className="drops-title-container">
        <h1 className="drops-title">Upcoming Drops</h1>
      </div>
    <div className="see-announcements-container">
        <ul className="announcements-list">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="announcement-item">
              <div className="drop">
                <div className="drop-img">
                  <img
                    id="drop-announcement-img"
                    src={"./images/uploads/" + announcement.fileName}
                    alt=""
                  />
                </div>
                <div className="drop-details">
                  <h3>{announcement.title}</h3>
                  <div className="desc">
                    <h4>{announcement.description}</h4>
                  </div>
                  <div className="price">
                    <h4 className="price-range">Price Range: </h4>
                    <h4 className="price-range-value">BDT {announcement.priceRange}</h4>
                  </div>
                  <div className='datetime'>
                  <i className="fas fa-clock"></i>
                    <h4>{new Date(announcement.dateTime).toLocaleString()}</h4> 
                  </div>
                  <div className='desc'>
                   <Link to={`/profile/${announcement.uploader}`}>
                    <h4 className="addedby">Added by <span>{announcement.uploader}</span></h4> 
                    </Link>
                  </div>
                  <button className="remindme-button" onClick={() => remindMe(announcement._id)}>
                    Remind me
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
    </>
  );
};

export default SeeAnnouncements;
