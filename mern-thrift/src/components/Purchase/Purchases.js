import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./Purchases.css";

const Purchases = ({ }) => {
  const token = localStorage.getItem("accessToken");
  const [purchases, setPurchases] = useState([]);
  const [sellerName, setSellerName] = useState([]);
  const [reviews, setReviews] = useState({});
  

  useEffect(() => {
    axios
      .get("http://localhost:9002/purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPurchases(response.data);
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
        // setReviews((prevReviews) => ({
        //   ...prevReviews,
        //   [purchaseId]: "",
        // }));
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
      <div className="page-header">
        <h1>My Orders</h1>
      </div>
      <div className="purchases-product-grid">
        {purchases.map((order, index) =>
          order[0].map((item, itemIndex) => (
            <div key={itemIndex} className="purchases-product-card">
              <img
                id="purchases-product-image"
                src={dest + item[3]}
                alt="not found"
              />
              <div className="purchases-product-details">
              <h1 className="purchases-product-name">{item[0]}</h1>
              <h1 className="purchases-product-price">BDT {item[1]}.00</h1>
              <h1 className="purchases-product-quantity">Quantity: {item[2]}</h1>
              <article key={{ item }}>
                <Link to={`/profile/${item[4]}`}>
                  <h1 className="purchases-product-seller">Bought from <span>{item[4]}</span></h1>
                </Link>
              </article>
              </div>
              <div className="purchases-review">
              <textarea
                value={reviews[item[4]] || ""}
                onChange={(event) => handleReviewChange(event, item[4])}
                placeholder="Write a review..."
              ></textarea>
              <button onClick={() => handleReviewSubmit(item[4])}>
                Submit
              </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Purchases;
