import React, { useEffect} from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const LoggedOutCart = ({ userCart }) => {

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
              <h1 className="no-items product">Your basket is empty </h1>
          </div>

          <div className="cart-total product">
            <h2>Basket Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>BDT 0.00</h3>
            </div>
            <button>
            <Link to="/login">
              Proceed to checkout
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoggedOutCart;