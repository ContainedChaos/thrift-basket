import React from "react"
import {useParams} from 'react-router-dom';
// import productItems from '../Data';

const ProductDetails = ({productItems, addToCart}) => {
  const {productId} = useParams();
  let myProductId = Number(productId);
  const product = productItems.find((product) => product.id === myProductId);
  const {id, discount, cover, name, price} = product;

  return (
    <>
    <div className="overall-container">
      <div className="product-details-container">
        <div className="product-image-grid">
          <img id="product-image" src={`http://localhost:3001/images/flash/flash-${productId}.png`} alt='image not found' />
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
            It was a simple green chair. There was nothing extraordinary about it or so it seemed. 
            It was the type of chair one would pass without even noticing it was there, let alone what 
            the actual color of it was. It was due to this common and unassuming appearance that few people 
            actually stopped to sit in it and discover its magical powers.
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