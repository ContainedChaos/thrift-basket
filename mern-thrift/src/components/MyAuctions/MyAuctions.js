import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./MyAuctions.css";

const MyAuctions = () => {
  const token = localStorage.getItem("accessToken");
  const [auctions, setAuctions] = useState([]);
  const dest = `http://localhost:3000/images/uploads/`;

  const nav = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:9002/myauctions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

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

  const start = (auctionId) => {

    axios
      .post(`http://localhost:9002/startauction/${auctionId}`)
      .then((response) => {
        console.log(response.data);
        response.alert(response.data);
        // Handle any success actions if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions if needed
      });
  };

  const view = (auctionId) => {
    nav(`/viewongoingauction/${auctionId}`)
  }
  

  return (
    <>
      <div className="drops-title-container">
      <h1 className="drops-title">My Auctions</h1>
      </div>
       <div className="see-announcements-container">
       <ul className="announcements-list">
      {auctions.map((drop) => (
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
          <div className="datetime">
            <i className="fas fa-clock"></i>
          <h4>{drop.startDate}</h4>
          </div>
          <div className="datetime">
            <i className="fas fa-clock"></i>
          <h4>{drop.endDate}</h4>
          </div>
          <div className="price">
            <h4 className="price-range">Price Range: </h4>
          <h4 className="price-range-value">BDT {drop.startingPrice}</h4>
          </div>
          {renderStatus(drop.startDate, drop.endDate) === "Upcoming" && (
                  <button className="remindme-button" onClick={() => start(drop._id)}>
                    Start
                  </button>
                )}
                
                  {renderStatus(drop.startDate, drop.endDate) === "Ongoing" && (<button className="remindme-button" onClick={() => view(drop._id)}>View</button>)}
                  {renderStatus(drop.startDate, drop.endDate) === "Ended" && (<button className="remindme-button" onClick={() => view(drop._id)}>View</button>)}

                  <div className="status">
                  {renderStatus(drop.startDate, drop.endDate) === "Ongoing" && (<p className="ongoing">{renderStatus(drop.startDate, drop.endDate)}</p>)}
                  {renderStatus(drop.startDate, drop.endDate) === "Upcoming" && (<p className="upcoming">{renderStatus(drop.startDate, drop.endDate)}</p>)}
                  {renderStatus(drop.startDate, drop.endDate) === "Ended" && (<p className="ended">{renderStatus(drop.startDate, drop.endDate)}</p>)}
                  </div>
          
          {/* Display other relevant information */}
          </div>
                </div>
                </li>
      ))}
      </ul>
    </div>
    </>
  );

}

export default MyAuctions;