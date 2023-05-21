import React, {Component} from "react"
import { Link } from "react-router-dom"
import "./Navbar.css";
import Head from "./Head";
import "./Header.css";


  const  Navbar = ({ userCart }) => {

  //   const storedUserCart = localStorage.getItem('userCart');
  // const initialUserCart = storedUserCart ? JSON.parse(storedUserCart) : [];

  // const [userCart, setUserCart] = useState(initialUserCart);

      
      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "http://localhost:3000/";
      }

  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='categories d_flex'>
          <h4 id="thriftbasket">
            <Link to="/" id="thriftbasket">ThriftBasket</Link>
            </h4>
          </div>

          <div className='navlinkk'>
            <ul className="link f_flex capitalize">
              <li>
                <Link to='/'>home</Link>
              </li>
              
              {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "false") ? (
                <li>
                <Link to='/sell'>Get Thrifty</Link>
                </li>
              ) : null}
              
              {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                <li>
                <Link to='/register'>Get Thrifty</Link>
                </li>
              ) : null}
              {(window.localStorage.getItem("isAuthenticated") === "true"  && window.localStorage.getItem("isBuyer") === "true") ? (
                <li>
                <Link to='/buy'>Get Thrifty</Link>
                </li>
              ) : null}
              {(window.localStorage.getItem("isBuyer") === "true") ? (
                <li>
                <Link to='/purchases'>My Orders</Link>
                </li>
              ) : null}
              {(window.localStorage.getItem("isAuthenticated") === "true"  && window.localStorage.getItem("isBuyer") === "false") ? (
                <li>
                <Link to='/sales'>My Sales</Link>
                </li>
              ) : null}
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
          </div>
            <div className="icons-container">
              <div className='icons'>
              {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                <Link to='/userprofile'>
                  <i className='fa fa-user icon-circle'></i>
                </Link>
                ) : (
                <Link to='/login'>
                  <i className='fa fa-user icon-circle'></i>
                </Link>
                )}
                {(window.localStorage.getItem("isBuyer") === "true") ? (
                  <Link to='/cart'>
                  <i className='fa fa-shopping-bag icon-circle'></i>
                  <span>{userCart.length}</span>
                </Link>
                ) : null}
                {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                  <Link to='/loggedoutcart'>
                  <i className='fa fa-shopping-bag icon-circle'></i>
                </Link>
                ) : null}
                {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                  <i className='fas fa-sign-out icon-circle' style={{cursor: "pointer"}} onClick={logOut}></i>
                ) : null }
              </div>
            </div>
            </div>
      </header>
      <Head/>
    </>
  )
}

export default Navbar