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
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <img
                  id="flashcard-img"
                  src={dest + auction.fileName}
                  alt=""
                />
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
                <div className="price">
                  {auction.winningBidder && (
                    <h4>{auction.winningBidder.name}</h4>
                  )}
                </div>
                <div className="datetime">
                  <h4>{new Date(auction.endDate).toLocaleString()}</h4>
                </div>
                <div className="timer">
                  <h4>{timeRemaining}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ViewOngoingAuction;