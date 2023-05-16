import React from "react"
import FlashCard from "./FlashCard"
import "./style.css"

const FlashDeals = ({ productItems, addToCart}) => {
  return (
    <>
    <div class = "sellerbuttons">
    {(window.localStorage.getItem("isBuyer") === "true" && window.localStorage.getItem("isAuthenticated") === "true") ? (
                <div className="button1" >
                <a href = "/announcements"> See upcoming drops </a>
                </div>
                ) : (
                  <div >
                  </div>
                )}

                <br/>

                {(window.localStorage.getItem("isBuyer") === "false" && window.localStorage.getItem("isAuthenticated") === "true") ? (
                <div className="button3">
                <a href = "/uploadproducts"> Upload Products </a>
                </div>
                ) : (
                <div>
                </div>
                )}

{(window.localStorage.getItem("isBuyer") === "true" && window.localStorage.getItem("isAuthenticated") === "true") ? (
                <div className="button4" >
                <a href = "/"> See upcoming auctions </a>
                </div>
                ) : (
                  <div >
                  </div>
                )}

                <br/>

                {(window.localStorage.getItem("isBuyer") === "false" && window.localStorage.getItem("isAuthenticated") === "true") ? (
                <div className="button2">
                <a href = "/announcedrop"> Add a drop announcement </a>
                </div>
                ) : (
                <div>
                </div>
                )}
                </div>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Flash Deals</h1>
          </div>
          <FlashCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  )
}

export default FlashDeals