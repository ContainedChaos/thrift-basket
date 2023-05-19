import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import Navbar from "../header/Navbar";
import { Link } from "react-router-dom";

const Cart = ({ userCart, setUserCart, addToCartFromCart, decreaseQty, removeFromCart }) => {
  // const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    fetchUserCart();
  }, []);

  // useEffect(() => {
  //   console.log(userCart);
  // }, [userCart]);
  

  const fetchUserCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:9002/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCart(response.data);
      console.log(userCart)
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  // Step: 7 Calculate total price of items
  const totalPrice = userCart.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  const dest = `http://localhost:3000/images/uploads/`;
  console.log(userCart)

  return (
    <>
      <Navbar userCart={userCart} />
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {userCart.length === 0 && (
              <h1 className="no-items product">Your basket is empty </h1>
            )}

            {userCart.map((item) => {
              const productQty = item.price * item.quantity;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={dest + item.fileName} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      BDT {item.price}.00 * {item.quantity}
                      <span>BDT {productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCart"
                        onClick={() => removeFromCart(item)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCartFromCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Basket Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>BDT {totalPrice}.00</h3>
            </div>
            <button>
            <Link to={`/proceed/${totalPrice}`}>
              Proceed to checkout
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;


