import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./seereviews.css";

const SeeReviews = ({ }) => {

    const token = localStorage.getItem("accessToken");
    console.log(token)
    
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
        axios
          .get("http://localhost:9002/seerev", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setReviews(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }, [token]);   


// const dest = `http://localhost:3000/images/uploads/`;

console.log(token)


return (
  <>
  
  <div className="myreview-container">
  <h2>My Reviews</h2>
  {reviews.map((review, index) => (
    
          <div className="myreview" key={index}>
            {/* <h1>Review for {review.sellerId.name}</h1> */}
            <p>{review.review}</p>
          </div>
          
        ))}
        </div>
  </>
);



};

export default SeeReviews;