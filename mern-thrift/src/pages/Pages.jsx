import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import Wrapper from "../components/wrapper/Wrapper"
import "./pages.css";

const Pages = ({userCart, productItems, addToCart}) => {
  return (
    <>
    <Home userCart={userCart} />
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