import React from "react";
import "./Buy.css"; // Import the CSS file for styling
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom";

const Buy = ({CartItem}) => {
  return (
    <>
    <div className="buycontainer">
      <div className="buyimage-container">
        <img
          src="./images/sell/sell5.jpg" 
          alt="Thrift Image"
          className="thrift-image2"
        />
      </div>
      <div className="buyerbuttons-wrapper">
      <div className="inspiring-section2">
            <h2 className="inspiring-title2">Redefining <span className="style-word">Style</span> with Thrifted Finds</h2>
            <p className="inspiring-paragraph2">
             Embrace the thrill of finding unique treasures, where affordability and 
              quality blend seamlessly. Each piece holds a hidden story, waiting to 
              be uncovered. Let your style become a reflection of your commitment
               to a greener, more ethical future. Step into a world of endless 
               possibilities, where fashion becomes a force for good!
            </p>
          </div>
      <div className="buyerbuttons-container">
      <Link to ="/announcements"><button className="thrift-button2">See Upcoming Drops</button></Link>
      <Link to ="/auctions"><button className="thrift-button2">See Upcoming Auctions</button></Link>
      </div>
      
      </div>
    </div>
    </>
  );
};

export default Buy;