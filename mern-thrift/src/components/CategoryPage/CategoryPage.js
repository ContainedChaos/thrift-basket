// CategoryPage component
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import Navbar from "../../common/header/Navbar";

const CategoryPage = (({addToCart, CartItem}) => {
  const { type } = useParams();
  const [productItems, setProductItems] = useState([]);

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

  

  return (
    <>
    <Navbar CartItem={CartItem}/>

      {
      productItems.map((product, index) => {

        return(
        <div key={index}>

          <h3>{product.name}</h3>

          <p>{product.desc}</p>

          <div className='img'>
          <img id="flashcard-img" src={"./images/uploads/"+product.fileName} alt='' />
          </div>

        </div>)

        })}
    </>
  )
})

export default CategoryPage;
