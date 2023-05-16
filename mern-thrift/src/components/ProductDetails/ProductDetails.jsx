import {useEffect, useState} from "react"
import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
// import productItems from '../Data';
import Navbar from "../../common/header/Navbar";

const ProductDetails = ({addToCart, CartItem}) => {
  const {productId} = useParams();
  const [productItem, setProductItem] = useState([]);
  let myProductId = Number(productId);
  // const product = productItem.find((product) => product.id === myProductId);
  // const {id, discount, cover, name, price, description} = product;
  // console.log(cover);

  useEffect(() => {
    axios
      .get(`http://localhost:9002/productdetails/${productId}`)
      .then((response) => {
        console.log(response.data);
        setProductItem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  // const imageSrc = URL.createObjectURL(new Blob([productItem.data], { type: productItem.contentType }));

  return (
    <>
    <Navbar CartItem={CartItem}/>
    
    <div className="overall-container">
      <div className="product-details-container">
        <div className="product-image-grid">
          
          <img id="product-image" src={"./images/uploads/"+productItem.fileName} alt='not found' />
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
          <button onClick={() => addToCart(productItem)}>
            Add to basket
          </button>
        </div> 
      </div>  
      </div> 
    </>
  )
}

export default ProductDetails;