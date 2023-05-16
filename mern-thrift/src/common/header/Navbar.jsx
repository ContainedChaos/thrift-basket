import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({ CartItem, isAuthenticated }) => {
  // fixed Header
  // window.addEventListener("scroll", function () {
  //   const search = document.querySelector(".search")
  //   search.classList.toggle("active", window.scrollY > 100)
  // })

  // Toogle Menu
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='categories d_flex'>
            <h4>
              ThriftBasket
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

          <div className='navlink'>
            <ul className="link f_flex capitalize">
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
              {(window.localStorage.getItem("isAuthenticated") === "true") ? (
                <Link to='/userprofile'>my profile</Link>
              ) : (
                <Link to='/login'>my profile</Link>
              )}
              </li>
              <li>
                <Link to='/'>track my order</Link>
              </li>
              <li>
                <Link to='/'>contact</Link>
              </li>
            </ul>
          </div>

          <div class='search'>
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
                  <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar