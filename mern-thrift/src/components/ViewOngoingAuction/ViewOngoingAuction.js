import React, {useState, useEffect, useContext} from "react"
import "./ViewOngoingAuction.css"
import axios from "axios"
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DataContext } from "../../context/DataProvider";
import Navbar from "../../common/header/Navbar";
import moment from 'moment';

const ViewOngoingAuction = ({ setIsAuthenticated, userCart }) => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState("");
  
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
  
    const dest = `http://localhost:3000/images/uploads/`;
  
    const startTimer = (endDate) => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        console.log(now);
        console.log(endDate);
        console.log(distance);
  
        if (distance < 0) {
          clearInterval(interval);
          setTimeRemaining("Auction ended");
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
          setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
        }
      }, 1000);
    };
  
    return (
      <>
        {auction && (
          <div className="place-bid-container">
              <div className="place-bid-image">
                <img
                  id="flashcard-img"
                  src={dest + auction.fileName}
                  alt=""
                />
              </div>
              <div className="place-bid-details">
                <h3>{auction.title}</h3>
                <div className="desc">
                  <h4>{auction.description}</h4>
                </div>
                <div className="price">
                  <h4>Startting Price: <span>BDT {auction.startingPrice}.00</span></h4>
                </div>
                <div className="price">
                  <h4>Current Price: <span>BDT {auction.currentPrice}.00</span></h4>
                </div>
                <div className="price">
                  {auction.winningBidder && (
                    <Link to={`/profile/${auction.winningBidder.name}`}>
                    <h4>Winning Bidder: <span>{auction.winningBidder.name}</span></h4>
                    </Link>
                  )}
                </div>
                <div className="datetime">
                  <h4>Ends at: {new Date(auction.endDate).toLocaleString()}</h4>
                </div>
                <div className="timer">
                  <h4>{timeRemaining}</h4>
                </div>
              </div>
            </div>
        )}
      </>
    );
  };
  
  export default ViewOngoingAuction;