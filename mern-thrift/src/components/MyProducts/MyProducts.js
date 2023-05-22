import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";
// import "./MyDrops.css";

const MyProducts = () => {
  const token = localStorage.getItem("accessToken");
  const [prods, setProds] = useState([]);
  const dest = `http://localhost:3000/images/uploads/`;

  useEffect(() => {
    axios
      .get("http://localhost:9002/myproducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProds(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);


  return (
    <>
    <div className="page-header">
      <h1>My Products</h1>
      </div>
      <div className="product-grid">
      {prods.map((prod) => (
        <div key={prod._id} className="product-card">
          <img id="flashcard-img"
                    src={dest + prod.fileName}
                    alt="not found"
                  />
          <h3 className="product-name">{prod.name}</h3>
          {/* <p>{prod.desc}</p> */}
          <h3 className="product-price">BDT {prod.price}.00</h3>
          
          {/* Display other relevant information */}
        </div>
      ))}
    </div>
    </>
  );
};


export default MyProducts;