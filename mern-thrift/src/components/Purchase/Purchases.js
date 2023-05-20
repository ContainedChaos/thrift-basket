import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";

const Purchases = ({ }) => {

    const token = localStorage.getItem("accessToken");
    const [purchases, setPurchases] = useState([]);
    const [sellerName, setSellerName] = useState([])
    const [reviews, setReviews] = useState({});
  
    useEffect(() => {
        axios
          .get("http://localhost:9002/purchases", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setPurchases(response.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }, [token]);

      const handleReviewChange = (event, purchaseId) => {
        const { value } = event.target;
        setReviews((prevReviews) => ({
          ...prevReviews,
          [purchaseId]: value,
        }));
      };
    
      const handleReviewSubmit = (purchaseId) => {
        const reviewText = reviews[purchaseId];
        // Send a POST request to write the review
        axios
          .post("http://localhost:9002/reviews", {
            purchaseId,
            review: reviewText,
          })
          .then((response) => {
            console.log("Review submitted successfully!");
            // Optionally, you can update the state or show a success message
          })
          .catch((error) => {
            console.error(error);
            // Handle error scenarios
          });
      };
      


const dest = `http://localhost:3000/images/uploads/`;


return (
  <>
    {purchases.map((order, index) => (
      <div className="box" key={index}>
        <article key={{index}}>
              <Link to={`/profile/${order[0]}`}>
              <h1>{order[0]}</h1>
              </Link>
          </article>
        {order[1].map((item, itemIndex) => (
          <div className="idk" key={itemIndex}>
            <h1>{item[0]}</h1>
            <h1>{item[1]}</h1>
            <h1>{item[2]}</h1>
            {/* {/* <h1>{item[4]}< */}
            <img
              id="product-image"
              src={dest + item[3]}
              alt="not found"
            />
          </div>
        ))}
        <textarea
      value={reviews[order[0]] || ""}
  onChange={(event) => handleReviewChange(event, order[0])}
  placeholder="Write a review..."
></textarea>
<button onClick={() => handleReviewSubmit(order[0])}>
  Review
</button>
      </div>
    ))}
  </>
);



};

export default Purchases;