import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import "./SeeAnnouncements.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  return (
    <>
    <div className="drops-title-container">
        <h1 className="drops-title">Upcoming Drops</h1>
      </div>
    <div className="see-announcements-container">
      
      <div className="left-grid">
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
                  <div className="datetime">
                    <h4>Date and Time: {new Date(announcement.dateTime).toLocaleString()}</h4>
                  </div>
                  <button id="remindme">Remind me</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-grid">
      {/* <div className="imagee-container">
          <img src="./images/sell/side.jpg" alt="Right Grid Image" className="animated-image" />
        </div> */}
</div>

    </div>
    </>
  );
};

export default SeeAnnouncements;
