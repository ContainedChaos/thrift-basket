import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Dresses",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Shirts",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Pants",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Skirts",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Tops",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Shoes",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Bags",
    },
  ]

  return (
    <>
      <div className='category'>
        <h5>Categories</h5>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories