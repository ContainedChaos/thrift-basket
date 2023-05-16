import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/dress.png",
      cateName: "Dresses",
      cateid: "Dresses", // Unique identifier for the category
    },
    {
      cateImg: "./images/category/shirt.png",
      cateName: "Shirts",
      cateid: "Shirts",
    },
    {
      cateImg: "./images/category/jeans.png",
      cateName: "Pants",
      cateid: "Pants",
    },
    {
      cateImg: "./images/category/skirt.png",
      cateName: "Skirts",
      cateid: "Skirts",
    },
    {
      cateImg: "./images/category/blouse.png",
      cateName: "Tops",
      cateid: "Tops",
    },
    {
      cateImg: "./images/category/sneakers.png",
      cateName: "Shoes",
      cateid: "Shoes",
    },
    {
      cateImg: "./images/category/handbag.png",
      cateName: "Bags",
      cateid: "Bags",
    },
  ];

  // const handleCategoryClick = (slug) => {
  //   // Redirect to the category page based on the slug
  //   window.location.href = `/category/${slug}`;
  // };


  return (
    <>
      <div className="category">
        <h5>Categories</h5>
        {data.map((value, index) => {
          return (
            <Link to={`/category/${value.cateid}`} key={index}>
            <div
              className="box f_flex"
              key={index}
              // onClick={() => handleCategoryClick(value.cateSlug)}
            >
              <img src={value.cateImg} alt="" />
              <span>{value.cateName}</span>
            </div>
            </Link>
          );
        })}
      </div>

      

    </>
  );
};

export default Categories;

