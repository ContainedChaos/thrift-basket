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
    <div>
      <h1>My Auctions</h1>
      {auctions.map((drop) => (
        <div key={drop._id}>
          <img
                    className="order-product-image"
                    src={dest + drop.fileName}
                    alt="not found"
                  />
          <h2>{drop.title}</h2>
          <p>{drop.description}</p>
          <p>{drop.startDate}</p>
          <p>{drop.endDate}</p>
          <p>{drop.startingPrice}</p>
          {renderStatus(drop.startDate, drop.endDate) === "Upcoming" && (
                  <button id="start" onClick={() => start(drop._id)}>
                    Start
                  </button>
                )}
                  {renderStatus(drop.startDate, drop.endDate) === "Ongoing" && (<button id="view" onClick={() => view(drop._id)}>View</button>)}
                  {/* {renderStatus(drop.startDate, drop.endDate) === "Ended" && (<button id="view" onClick={() => view(drop._id)}>View</button>)} */}

          {renderStatus(drop.startDate, drop.endDate)}
          
          {/* Display other relevant information */}
        </div>
      ))}
    </div>
  );

      }

export default MyAuctions;