import React from "react"
import { Link } from "react-router-dom"

const NavbarWithSearch = ({ CartItem, isAuthenticated }) => {
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

          <div className="search">
            <div className='search-box f_flex'>
              <i className='fa fa-search'></i>
              <input type='text' placeholder='Search and hit enter...' />
            </div>
          </div> 

          <div className='navlinkk'>
            <ul className="link f_flex capitalize">
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/'>my profile</Link>
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
              {isAuthenticated ? (
                <Link to='/homepage'>
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

export default NavbarWithSearch