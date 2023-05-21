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
    <div>
      <h1>My Products</h1>
      {prods.map((prod) => (
        <div key={prod._id}>
          <img
                    className="order-product-image"
                    src={dest + prod.fileName}
                    alt="not found"
                  />
          <h2>{prod.name}</h2>
          <p>{prod.desc}</p>
          <p>{prod.price}</p>
          
          {/* Display other relevant information */}
        </div>
      ))}
    </div>
  );
};


export default MyProducts;