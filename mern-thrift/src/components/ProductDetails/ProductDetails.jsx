import {useEffect, useState} from "react"
import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
// import productItems from '../Data';
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom"
import MessageBox from "../MessageBox/MessageBox";

const ProductDetails = ({addToCart, CartItem}) => {
  const {productId} = useParams();
  const [productItem, setProductItem] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [uploader, setUploader] = useState([]);
  let myProductId = Number(productId);
  // const product = productItem.find((product) => product.id === myProductId);
  // const {id, discount, cover, name, price, description} = product;
  // console.log(cover);

  useEffect(() => {
    axios
      .get(`http://localhost:9002/productdetails/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProductItem(response.data.product);
        setUploader(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  const handleOpenMessageBox = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  const dest = `http://localhost:3000/images/uploads/`;

  // const imageSrc = URL.createObjectURL(new Blob([productItem.data], { type: productItem.contentType }));

  return (
    <>
    <Navbar CartItem={CartItem}/>
    
    <div className="overall-container">
      <div className="product-details-container">
        <div className="product-image-grid">
          
        <img id="product-image" src={dest+productItem.fileName} alt='not found' />
          {/* <img id="product-image" src={"./images/uploads/"+productItem.fileName} alt='not found' /> */}
        </div>
        <div className="product-details-grid">
          <h2>{productItem.name}</h2>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
            <p>
            {productItem.desc}
            </p>
          <div className="product-price">
          <h4>BDT {productItem.price}.00</h4>
          </div>
          
          <article key={uploader}>
              <Link to={`/profile/${uploader}`}>
                <h3>{uploader}</h3>
              </Link>
          </article>
          {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "true") ? (
                      <button onClick={() => addToCart(productItem)}>
                      Add to Basket
                    </button>
                    ) :null}
                    {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                      <button onClick={handleOpenMessageBox}>
                      Add to Basket
                    </button>
                    ) :null}
        </div> 
      </div>  
      </div> 

      {showMessageBox && (
        <MessageBox
          message="Please login first"
          onClose={handleCloseMessageBox}
        />
      )}
    </>
  )
}

export default ProductDetails;