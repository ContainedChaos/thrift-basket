import React, { Component } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./Navbar.css";
import "./Header.css";

class NavbarWithSearch extends Component {
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  }

  render() {
    const { CartItem, isAuthenticated } = this.props;
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
              <li>
                <Link to='/'>About</Link>
              </li>
            </ul>
          </div>

          <div className=''>
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
                {(window.localStorage.getItem("isAuthenticated") !== "true" || window.localStorage.getItem("isBuyer") === "true") ? (
                  <Link to='/cart'>
                  <i className='fa fa-shopping-bag icon-circle'></i>
                  <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
                </Link>
                ) : null}
                {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                  <i className='fas fa-sign-out icon-circle' style={{cursor: "pointer"}} onClick={this.logOut}></i>
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
}

export default NavbarWithSearch;
