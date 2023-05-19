// CategoryPage component
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = (({addToCart, userCart}) => {
  const { type } = useParams();
  const [productItems, setProductItems] = useState([]);
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    // Fetch products for the category from the backend
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

  const dest = `http://localhost:3000/images/uploads/`;

  return (
    <>
    <Navbar userCart={userCart}/>
    <div className="page-header">
      <h1>{type}</h1>
    </div>
    <div className="product-grid">
      {
      productItems.map((product, index) => {

        return(
        <div key={index} className="product-card">

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                 <img id="flashcard-img" src={dest+product.fileName} alt='' />
                  {/* <img id="flashcard-img" src={`data:image/png;base64,${base64String}`} alt="Uploaded" /> */}
              </Link>
          </article>

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                  <h3 className="product-name">{product.name}</h3>
              </Link>
          </article>

          <h3 className="product-price">BDT {product.price}.00</h3>

          <button onClick={() => addToCart(product)}>
              <i className='fa fa-plus'></i>
          </button>

        </div>)

        })}
        </div>
    </>
  )
})

export default CategoryPage;
