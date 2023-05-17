import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import axios from "axios"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}
const FlashCard = ({ addToCart}) => {
  const [productItems, setProductItems] = useState([]);
  // const [imageSrc, setImageSrc] = useState('');
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  useEffect(() => {
    axios
      .get("http://localhost:9002/flashproducts")
      .then((response) => {
        console.log(response.data);
        setProductItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 
  

  return (
    <>
    <Slider {...settings}>
    {
      productItems.map((productItem) => {
        // const imageSrc = `data:${productItem.contentType};base64,${productItem.data.toString('base64')}`;
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(productItem.data)));
        // const imageSrc = URL.createObjectURL(
        //   new Blob([productItem.data], { type: productItem.contentType })
        // );
        // const destination="./public/uploads/";
        // const imageSrc=destination+productItem.fileName;

        
      return(
            <div className='box'>
              <div className='product mtop'>
                <div className='img'>
                  <span className='discount'>20% Off</span>
                  <article key={productItem._id}>
                    <Link to={`/productdetails/${productItem._id}`}>
                  <img id="flashcard-img" src={"./images/uploads/"+productItem.fileName} alt='' />
                  {/* <img id="flashcard-img" src={`data:image/png;base64,${base64String}`} alt="Uploaded" /> */}

                  </Link>
                  </article>
                  <div className='product-like'>
                    <label>0</label> <br />
                    <i className='fa-regular fa-heart' onClick={increment}></i>
                  </div>
                </div>
                <div className='product-details'>
                <article key={productItem._id}>
                    <Link to={`/productdetails/${productItem._id}`}>
                  <h3>{productItem.name}</h3>
                  </Link>
                  </article>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className='price'>
                    <h4>{productItem.price}.00</h4> 
                    <button onClick={() => addToCart(productItem)}>
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>)
            })
          }
          </Slider>
            </>
          )
}

export default FlashCard