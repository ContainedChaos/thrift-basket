import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageBox from "../MessageBox/MessageBox";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  )
}
const FlashCard = ({ addToCart}) => {
  const [productItems, setProductItems] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

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

  const handleOpenMessageBox = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  return (
    <>
      <Slider {...settings}>
        {productItems.map((productItem) => (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <span className="discount">20% Off</span>
                <article key={productItem._id}>
                  <Link to={`/productdetails/${productItem._id}`}>
                    <img
                      id="flashcard-img"
                      src={"./images/uploads/" + productItem.fileName}
                      alt=""
                    />
                  </Link>
                </article>
              </div>
              <div className="product-details">
                <article key={productItem._id}>
                  <Link to={`/productdetails/${productItem._id}`}>
                    <h3>{productItem.name}</h3>
                  </Link>
                </article>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price">
                  <h4>{productItem.price}.00</h4>
                  {window.localStorage.getItem("isAuthenticated") ===
                    "true" &&
                  window.localStorage.getItem("isBuyer") === "true" ? (
                    <button onClick={() => addToCart(productItem)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  ) : null}
                  {window.localStorage.getItem("isAuthenticated") !==
                  "true" ? (
                    <button onClick={handleOpenMessageBox}>
                      <i className="fa fa-plus"></i>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {showMessageBox && (
        <MessageBox
          message="Please login first"
          onClose={handleCloseMessageBox}
        />
      )}
    </>
  );
};

export default FlashCard;
