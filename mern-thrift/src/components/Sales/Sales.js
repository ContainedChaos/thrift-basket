import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
import "./Sales.css";

const Sales = () => {
  const token = localStorage.getItem("accessToken");
  const [purchases, setPurchases] = useState([]);
  const dest = `http://localhost:3000/images/uploads/`;

  useEffect(() => {
    axios
      .get("http://localhost:9002/sales", {
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

  return (
    <>
      <div className="mysales-page-header">
        <h1>My Sales</h1>
      </div>
      <div className="sales-order-grid">
        {purchases.map((order, index) => (
          <div key={index} className="order-card">
            <Link to={`/profile/${order[0]}`}>
              <h1 className="orderer-name">Sold to {order[0]}</h1>
            </Link>
            <div className="order-product-grid">
              {order[1].map((item, itemIndex) => (
                <div key={itemIndex} className="order-product-card">
                  <img
                    className="order-product-image"
                    src={dest + item[3]}
                    alt="not found"
                  />
                  <h1 className="order-product-name">{item[0]}</h1>
                  <h1 className="order-product-price">BDT {item[1]}.00</h1>
                  <h1 className="order-product-quantity">Quantity: {item[2]}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default Sales;
