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
      


const dest = `http://localhost:3000/images/uploads/`;


return (
  <>
  <div className="page-header">
      <h1>My Orders</h1>
    </div>
    <div className="product-grid">
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
            <img
              id="product-image"
              src={dest + item[3]}
              alt="not found"
            />
            <button>Review</button>
          </div>
        ))}
      </div>
    ))}
    </div>
  </>
);



};

export default Purchases;