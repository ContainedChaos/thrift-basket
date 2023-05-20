import {useEffect, useState} from "react"
import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
// import productItems from '../Data';
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom"
import MessageBox from "../MessageBox/MessageBox";
import "./ProductDetails.css";

const ProductDetails = ({addToCart, userCart}) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="product-details-container2">
        <div className="product-image-container2">
          
        <img id="product-image2" src={dest+productItem.fileName} alt='not found' />
          {/* <img id="product-image" src={"./images/uploads/"+productItem.fileName} alt='not found' /> */}
        </div>
        <div className="product-details2">
          <h2>{productItem.name}</h2>
                  <div className='rate2'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
            <p>
            {productItem.desc}
            </p>

            
          <div className="product-price2">
          <h4>BDT {productItem.price}.00</h4>
          </div>
          

          
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
                    <article key={uploader}>
  <div className="added-by">
    <h4>View more products by this seller here: </h4>
    <Link to={`/profile/${uploader}`}>
      <h3>{uploader}</h3>
    </Link>
  </div>
</article>
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