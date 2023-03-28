import React from "react"
import {useParams} from 'react-router-dom';
// import productItems from '../Data';
import Navbar from "../../common/header/Navbar";

const ProductDetails = ({productItems, addToCart, CartItem}) => {
  const {productId} = useParams();
  let myProductId = Number(productId);
  const product = productItems.find((product) => product.id === myProductId);
  const {id, discount, cover, name, price, description} = product;
  console.log(cover);

  return (
    <>
    <Navbar CartItem={CartItem}/>
    <div className="overall-container">
      <div className="product-details-container">
        <div className="product-image-grid">
          <img id="product-image" src={cover} alt='image not found' />
        </div>
        <div className="product-details-grid">
          <h2>{name}</h2>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
            <p>
            {description}
            </p>
          <div className="product-price">
          <h4>BDT {price}.00</h4>
          </div>
          <button onClick={() => addToCart(product)}>
            Add to basket
          </button>
        </div> 
      </div>  
      </div> 
    </>
  )
}

export default ProductDetails;