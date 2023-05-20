import React, {Component} from "react"
import { Link } from "react-router-dom"
import "./Navbar.css";
import Head from "./Head";
import "./Header.css";


    const  Navbar = ({ CartItem, isAuthenticated }) => {
      
      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./";
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

        {/* {isAuthenticated ? (
          <div className="search">
            <div className='search-box f_flex'>
              <i className='fa fa-search'></i>
              <input type='text' placeholder='Search and hit enter...' />
            </div>
          </div> 
        ) : <></>} */}

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
                <Link to='/myorders'>My Orders</Link>
                </li>
              ) : null}
              <li>
                <Link to='/'>About</Link>
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
                  <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
                </Link>
                ) : null}
                {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                  <Link to='/cart'>
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