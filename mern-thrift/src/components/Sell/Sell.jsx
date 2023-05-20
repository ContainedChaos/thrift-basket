import React from "react";
import "./Sell.css"; // Import the CSS file for styling
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom";

const Sell = ({CartItem}) => {
  return (
    <>
    <div className="sellcontainer">
      <div className="sellimage-container">
        <img
          src="./images/sell/sell2.jpg" 
          alt="Thrift Image"
          className="thrift-image"
        />
      </div>
      <div className="sellerbuttons-wrapper">
      <div className="inspiring-section">
            <h2 className="inspiring-title">Unleash the magic of <span className="preloved-word">Preloved</span></h2>
            <p className="inspiring-paragraph">
              Embrace the joy of thrifting, where treasures find new homes and
              stories unfold. By selling your preloved items, you're not just 
              parting ways with possessions, but embracing a meaningful journey.
              Each item carries a story, a memory, and a chance to make someone 
              else's life a little brighter. Let your journey begin!
            </p>
          </div>
      <div className="sellerbuttons-container">
      <Link to ="/uploadproducts"><button className="thrift-button">Upload Products</button></Link>
      <Link to ="/announcedrop"><button className="thrift-button">Add a Drop Announcement</button></Link>
      <Link to ="/announceauction"><button className="thrift-button">Add an Auction Announcement</button></Link>
      </div>
      
      </div>
    </div>
    </>
  );
};

export default Sell;
