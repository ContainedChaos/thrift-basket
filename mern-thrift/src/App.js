// import './App.css';
// import React from 'react';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import DataProvider from './context/DataProvider';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import UserProfile from './components/UserProfile/UserProfile';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Navbar from './common/header/Navbar';



import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Verify from './components/verify/verify';
import sellerHomepage from './components/homepage/sellerHomepage';

function App() {
  /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma
  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :
  const { productItems } = Data
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    setCartItem(CartItem.filter((item) => item.id !== product.id))
  }

  // Stpe: 6
  const decreaseQty = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  const [ user, setLoginUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ( {isAuthenticated, ...props}) => {

    return isAuthenticated ?
    <>
      <Outlet />
    </>
    : <Navigate replace to = '/' />
  }

  return (
    <>
    <DataProvider>
      <Router>
      {/* <Header CartItem={CartItem} isAuthenticated={isAuthenticated}/> */}
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} CartItem={CartItem}/>}/>
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated}setIsAuthenticated={setIsAuthenticated} CartItem={CartItem}/>}/>
          <Route path="/register" element={<Register CartItem={CartItem}/>}/>
          <Route path="/verify" element={<Verify CartItem={CartItem}/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword CartItem={CartItem}/>}/>
          <Route path="/passwordreset" element={<PasswordReset CartItem={CartItem}/>}/>
          <Route path="/userprofile" element={<UserProfile CartItem={CartItem} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path='/productdetails/:productId' element={<ProductDetails productItems={productItems} addToCart={addToCart} CartItem={CartItem} />}/>
          {/* <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} > */}
            <Route path="/homepage" element={<Homepage setIsAuthenticated={setIsAuthenticated} CartItem={CartItem} isAuthenticated={isAuthenticated}/>}/>
            <Route path="/sellerhomepage" element={<sellerHomepage setIsAuthenticated={setIsAuthenticated} CartItem={CartItem} isAuthenticated={isAuthenticated}/>}/>
          {/* </Route> */}
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removeFromCart={removeFromCart}/>}/>
        </Routes>
      <Footer />
      </Router>
    </DataProvider>
    </>
  )
}

export default App
