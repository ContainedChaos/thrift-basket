import React from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./Navbar.css";
import "./Header.css";

const NavbarWithSearch = ({ userCart }) => {
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
              
                {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                  <li>
                  <Link to='/userprofile'>my profile</Link>
                  </li>
                ) : null}
              
              {(window.localStorage.getItem("isAuthenticated") !== "true") ? (
                <li>
                <Link to='/register'>Become a Member</Link>
                </li>
              ) : null}
             
              {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "true") ? (
                <li className="dropdown">
                  <span>Explore</span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/page1">Upcoming Drops</Link>
                    </li>
                    <li>
                      <Link to="/page2">Upcoming Auctions</Link>
                    </li>
                    <li>
                      <Link to="/page3">???</Link>
                    </li>
                  </ul>
                </li>
              ) : null}
              {(window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "false") ? (
                <li>
                  <Link to='/'>More?</Link>
                </li>
              ) : null}
              <li>
                <Link to='/'>About</Link>
              </li>
            </ul>
          </div>

          <div className='search'>
            <div className='icon f_flex width'>
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
                <Link to='/cart'>
                  <i className='fa fa-shopping-bag icon-circle'></i>
                  <span>{userCart.length}</span>
                </Link>
                {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                <Link to='/'>
                  <i className='fas fa-sign-out icon-circle'></i>
                </Link>
                ) : null }
              </div>
            </div>
          </div>
        </div>
      </header>
      <Head/>
    </>
  );
};

export default NavbarWithSearch;
