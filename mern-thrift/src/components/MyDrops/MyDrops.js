import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./MyDrops.css";


const MyDrops = () => {
  const token = localStorage.getItem("accessToken");
  const [drops, setDrops] = useState([]);
  const dest = `http://localhost:3000/images/uploads/`;

  useEffect(() => {
    axios
      .get("http://localhost:9002/mydrops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDrops(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const getCurrentTime = () => {
    return new Date();
  };

  const renderStatus = (dateTime) => {
    const currentTime = getCurrentTime();
    const dropDateTime = new Date(dateTime);
  
    if (dropDateTime < currentTime) {
      return "Ended";
    } else {
      return "Upcoming";
    }
  };

  return (
    <>
    <div className="drops-title-container">
      <h1 className="drops-title">My Drops</h1>
      </div>
       <div className="see-announcements-container">
       <ul className="announcements-list">
      {drops.map((drop) => (
        <li key={drop.id} className="announcement-item">
          <div className="drop">
                <div className="drop-img">
          <img
                    className="order-product-image"
                    src={dest + drop.fileName}
                    alt="not found"
                  />
                  </div>
                  <div className="drop-details">
          <h3>{drop.title}</h3>
          <div className="desc">
          <h4>{drop.description}</h4>
          </div>
          <div className="price">
            <h4 className="price-range">Price Range: </h4>
          <h4 className="price-range-value">BDT {drop.priceRange}</h4>
          </div>
          <div className="datetime">
            <i className="fas fa-clock"></i>
            <h4>{new Date(drop.dateTime).toLocaleString()}</h4>
          </div>
          
          {renderStatus(drop.dateTime) === "Upcoming" && (<button className="mydropsremindme-button">{renderStatus(drop.dateTime)}</button>)}
          {renderStatus(drop.dateTime) === "Ended" && (<button className="mydropsendedremindme-button">{renderStatus(drop.dateTime)}</button>)}
          
        </div>
        </div>
        </li>
      ))}
      </ul>
    </div>
    </>
  );
};


export default MyDrops;