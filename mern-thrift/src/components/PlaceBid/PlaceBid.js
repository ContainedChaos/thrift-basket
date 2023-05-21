import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlaceBid = ({ setIsAuthenticated, userCart }) => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [bid, setBid] = useState(""); 

  useEffect(() => {
    axios
      .get(`http://localhost:9002/bidpage/${auctionId}`)
      .then((response) => {
        console.log(response.data);
        const auctionData = response.data;
        const endDate = new Date(auctionData.endDate).toISOString();
        startTimer(new Date(endDate));
        setAuction(auctionData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auctionId]);

  const startTimer = (endDate) => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining("Auction ended");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setBid(e.target.value);
  };

  const dest = `http://localhost:3000/images/uploads/`;

  const Bid = () => {
    axios
      .post(`http://localhost:9002/bid/${auctionId}`, {
        token: localStorage.getItem("accessToken"),
        amount: bid, // Use the bid directly, no need to wrap in an object
        timestamp: new Date().toISOString(),
      })
      .then((response) => {
        console.log("Bid submitted successfully");
        window.location.reload()
        // Handle the response or show a success message to the user
      })
      .catch((error) => {
        console.error(error);
        // Handle the error or show an error message to the user
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000); // Reload every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!auction) {
    return <div>Loading...</div>;
  }

  

  return (
    <>
      <div className="box">
        <div className="product mtop">
          <div className="img">
            <img id="flashcard-img" src={dest + auction.fileName} alt="" />
          </div>
          <div className="product-details">
            <h3>{auction.title}</h3>
            <div className="desc">
              <h4>{auction.description}</h4>
            </div>
            <div className="price">
              <h4>{auction.startingPrice}</h4>
            </div>
            <div className="price">
              <h4>{auction.currentPrice}</h4>
            </div>
            <div className="datetime">
              <h4>{new Date(auction.startDate).toLocaleString()}</h4>
            </div>
            <div className="datetime">
              <h4>{new Date(auction.endDate).toLocaleString()}</h4>
            </div>
            <div className="price">
  {auction.winningBidder && <h4>{auction.winningBidder.name}</h4>}
</div>
<div className="price">
  <h4>{auction.currentPrice !== null ? auction.currentPrice : "N/A"}</h4>
</div>
            <div className="timer">
              <h4>{timeRemaining}</h4>
            </div>
            <input
              type="text"
              name="bid"
              value={bid}
              onChange={handleChange}
              placeholder="Enter your bid"
            />
            <button onClick={Bid}>Place Bid</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceBid;
