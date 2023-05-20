import React, { Component } from "react";
import Navbar from "../../common/header/Navbar"; 
import "./Othersprofile.css";
import {useEffect, useState} from "react"
import axios from "axios";
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom"
import MessageBox from "../MessageBox/MessageBox";

const Othersprofile = ({addToCart, userCart}) => {
  const {username} = useParams();
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  const [orders, setOrders] = useState(0)
  // const product = productItem.find((product) => product.id === myProductId);
  // const {id, discount, cover, name, price, description} = product;
  // console.log(cover);

  useEffect(() => {
    axios
      .get(`http://localhost:9002/profile/${username}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
        setProducts(response.data.products);
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  const handleOpenMessageBox = () => {
    setShowMessageBox(true);
  };

  const handleCloseMessageBox = () => {
    setShowMessageBox(false);
  };

  const dest = `http://localhost:3000/images/uploads/`;

  // const imageSrc = URL.createObjectURL(new Blob([productItem.data], { type: productItem.contentType }));

  return (
    <>
            <div className="user-profile">
                <h2>Profile</h2>
                <label className="attribute">Name:</label> <label className="info">{user.name}</label><br/>
                <label className="attribute">Email:</label> <label className="info">{user.email}</label><br/>
                <label className="attribute">Phone:</label> <label className="info">{user.phone}</label><br/>
                <label className="attribute">Role:</label> <label className="info">{user.role}</label><br/>
                <label className="attribute">Orders:</label> <label className="info">{orders}</label><br/>
            </div>

            {
      products.map((product, index) => {

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

          {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "true") ? (
                      <button onClick={() => addToCart(product)}>
                      <i className='fa fa-plus'></i>
                    </button>
                    ) :null}
                    {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                      <button onClick={handleOpenMessageBox}>
                      <i className='fa fa-plus'></i>
                    </button>
                    ) :null}

        </div>)

        })}
        {showMessageBox && (
        <MessageBox
          message="Please login first"
          onClose={handleCloseMessageBox}
        />
      )}

    </>
  )
}

export default Othersprofile;