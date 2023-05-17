// CategoryPage component
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import Navbar from "../../common/header/Navbar";
import { Link } from "react-router-dom";

const CategoryPage = (({addToCart, CartItem}) => {
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
    <Navbar CartItem={CartItem}/>

      {
      productItems.map((product, index) => {

        return(
        <div key={index}>

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                  <h3>{product.name}</h3>
              </Link>
          </article>

          <p>{product.desc}</p>

          <article key={product._id}>
              <Link to={`/productdetails/${product._id}`}>
                 <img id="flashcard-img" src={dest+product.fileName} alt='' />
                  {/* <img id="flashcard-img" src={`data:image/png;base64,${base64String}`} alt="Uploaded" /> */}

              </Link>
          </article>

          <button onClick={() => addToCart(product)}>
              <i className='fa fa-plus'></i>
          </button>

        </div>)

        })}
    </>
  )
})

export default CategoryPage;
