import React from "react"
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"

const Header = ({ CartItem , isAuthenticated}) => {
  return (
    <>
      {/* <Head /> */}
      {/* <Search CartItem={CartItem} /> */}
      <Navbar CartItem={CartItem} isAuthenticated = {isAuthenticated}/>
    </>
  )
}

export default Header