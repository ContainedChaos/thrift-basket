import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/dress.png",
      cateName: "Dresses",
    },
    {
      cateImg: "./images/category/shirt.png",
      cateName: "Shirts",
    },
    {
      cateImg: "./images/category/jeans.png",
      cateName: "Pants",
    },
    {
      cateImg: "./images/category/skirt.png",
      cateName: "Skirts",
    },
    {
      cateImg: "./images/category/blouse.png",
      cateName: "Tops",
    },
    {
      cateImg: "./images/category/sneakers.png",
      cateName: "Shoes",
    },
    {
      cateImg: "./images/category/handbag.png",
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