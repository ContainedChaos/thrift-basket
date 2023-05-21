import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./Othersprofile.css";

const Othersprofile = ({ addToCart, userCart }) => {
  const { username } = useParams();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:9002/profile/${username}`)
      .then((response) => {
        setUser(response.data.user);
        setProducts(response.data.products);
        setOrders(response.data.orders);
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  const handleOpenMessageBox = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  const dest = `http://localhost:3000/images/uploads/`;

  return (
    <>
    <div className="others-profile-container">
      <div className="left-section">
    {(user.role) === "seller" && 
      <div className="others-profile">
        <h2>Seller</h2>
        <label className="mattribute">Name:</label>{" "}
        <label className="others-info">{user.name}</label>
        <br />
        <label className="mattribute">Email:</label>{" "}
        <label className="others-info">{user.email}</label>
        <br />
        <label className="mattribute">Phone:</label>{" "}
        <label className="others-info">{user.phone}</label>
        <br />
        <label className="mattribute">Orders:</label>{" "}
        <label className="others-info">{orders}</label>
        <br />
      </div>}

      {(user.role) === "buyer" && 
      <div className="buyer-profile">
        <h2>Buyer</h2>
        <label className="mattribute">Name:</label>{" "}
        <label className="others-info">{user.name}</label>
        <br />
        <label className="mattribute">Email:</label>{" "}
        <label className="others-info">{user.email}</label>
        <br />
        <label className="mattribute">Phone:</label>{" "}
        <label className="others-info">{user.phone}</label>
        <br />
      </div>}

      {/* <div className="reviews-container">
      <h2>Reviews</h2>
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <p>{review.review}</p>
          </div>
        ))}
      </div> */}
      </div>

<div className="right-container">
      <div className="others-profile-products-container">
        {products.map((product, index) => (
          <div className="others-profile-product-card" key={index}>
            <article>
              <Link to={`/productdetails/${product._id}`}>
                <img
                  id="others-profile-img"
                  src={dest + product.fileName}
                  alt=""
                />
              </Link>
            </article>

            <article>
              <Link to={`/productdetails/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
            </article>

            <p>BDT {product.price}.00</p>

            {window.localStorage.getItem("isAuthenticated") === "true" &&
            window.localStorage.getItem("isBuyer") === "true" ? (
              <button onClick={() => addToCart(product)}>
                <i className="fa fa-plus"></i>
              </button>
            ) : null}
            {window.localStorage.getItem("isAuthenticated") !== "true" ? (
              <button onClick={handleOpenMessageBox}>
                <i className="fa fa-plus"></i>
              </button>
            ) : null}
          </div>
        ))}
        </div>
      </div>

      {showMessageBox && (
        <MessageBox
          message="Please login first"
          onClose={handleCloseMessageBox}
        />
      )}
    </div>
    </>
  );
};

export default Othersprofile;
