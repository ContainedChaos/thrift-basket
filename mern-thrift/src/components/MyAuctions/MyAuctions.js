import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./MyAuctions.css";

const MyAuctions = () => {
  const token = localStorage.getItem("accessToken");
  const [auctions, setAuctions] = useState([]);
  const dest = `http://localhost:3000/images/uploads/`;

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
      return <p>Ongoing</p>;
    } else if (auctionStart > currentTime) {
      return <p>Upcoming</p>;
    }
    else if (auctionStart < currentTime && auctionEnd < currentTime) {
      return <p>Ended</p>
    }
  };

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
          {renderStatus(drop.startDate, drop.endDate)}
          
          {/* Display other relevant information */}
        </div>
      ))}
    </div>
  );
};


export default MyAuctions;