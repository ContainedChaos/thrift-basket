import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import Wrapper from "../components/wrapper/Wrapper"
import "./pages.css";

const Pages = ({productItems, CartItem, addToCart, shopItems}) => {
  return (
    <>
    <Home CartItem={CartItem}/>
    <FlashDeals productItems={productItems} addToCart={addToCart}/>
    <TopCate />
    {/* <NewArrivals /> */}
    {/* <Discount /> */}
    {/* <Shop shopItems={shopItems} addToCart={addToCart} /> */}
    {/* <Annocument /> */}
    <Wrapper />
    </>
  )
}

export default Pages