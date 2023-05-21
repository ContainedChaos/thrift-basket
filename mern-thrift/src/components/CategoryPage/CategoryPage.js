import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import MessageBox from "../MessageBox/MessageBox";

const CategoryPage = (({addToCart}) => {
  const { type } = useParams();
  const [productItems, setProductItems] = useState([]);
  
  const [showMessageBox, setShowMessageBox] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9002/category/${type}`)
      .then((response) => {
        console.log(response.data);
        setProductItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [type]);

  const handleOpenMessageBox = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  const dest = `http://localhost:3000/images/uploads/`;

  return (
    <>
    <div className="page-header">
      <h1>{type}</h1>
    </div>
    <div className="order-grid">
      {
      productItems.map((product, index) => {

        return(
        <div key={index} className="product-card">

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                 <img id="flashcard-img" src={dest+product.fileName} alt='' />
              </Link>
          </article>

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                  <h3 className="product-name">{product.name}</h3>
              </Link>
          </article>

          <h3 className="product-price">BDT {product.price}.00</h3>

          {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "true") ? (
                      <button onClick={() => addToCart(product)}>
                      <i className='fa fa-plus'></i>
                    </button>
                    ) :null}
                    {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                      <button onClick={handleOpenMessageBox}>
                      <i className='fa fa-plus'></i>
                    </button>
                    ) :null}

        </div>)

        })}
        </div>

        {showMessageBox && (
        <MessageBox
          message="Please login first"
          onClose={handleCloseMessageBox}
        />
      )}
    </>
  )
})

export default CategoryPage;
