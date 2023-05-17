import React from "react"

const Head = () => {
  return (
    <>
      {(window.localStorage.getItem("isBuyer") === "true" && window.localStorage.getItem("isAuthenticated") == "true") ? (
                  <label id="accounttype">Buyer Account</label>
                ) : (
                  <label></label>
                )}
      {(window.localStorage.getItem("isBuyer") === "false" && window.localStorage.getItem("isAuthenticated") == "true") ? (
                  <label id="accounttype">Seller Account</label>
                ) : (
                  <label></label>
                )}
    </>
  )
}

export default Head