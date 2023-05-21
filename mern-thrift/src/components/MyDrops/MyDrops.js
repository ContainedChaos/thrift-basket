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
      return <p>Ended</p>;
    } else {
      return <p>Upcoming</p>;
    }
  };

  return (
    <div>
      <h1>My Drops</h1>
      {drops.map((drop) => (
        <div key={drop._id}>
          <img
                    className="order-product-image"
                    src={dest + drop.fileName}
                    alt="not found"
                  />
          <h2>{drop.title}</h2>
          <p>{drop.description}</p>
          <p>{drop.dateTime}</p>
          <p>{drop.priceRange}</p>
          {renderStatus(drop.dateTime)}
          
          {/* Display other relevant information */}
        </div>
      ))}
    </div>
  );
};


export default MyDrops;