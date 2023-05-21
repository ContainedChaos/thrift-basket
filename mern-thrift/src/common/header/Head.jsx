import React from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const handleSelect = (e) => {
    const selectedAccountType = e.target.value;
    console.log("Selected Account Type:", selectedAccountType);
    if (selectedAccountType) {
      window.location.href = selectedAccountType;
    }
  };
  return (
    <>
      <div className="select-container">
      {window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") !== "true" && (
        <div className="select-container" style={{ display: "flex", alignItems: "center" }}>
          <select onChange={handleSelect}>
            <option value="">Explore your options</option>
            <option value="/uploadproducts">Upload Products</option>
            <option value="/announcedrop">Announce a Drop</option>
            <option value="/announceauction">Announce an Auction</option>
            <option value="/mydrops">My Drops</option>
            <option value="/myauctions">My Auctions</option>
          </select>
          <label style={{ marginLeft: "10px" }} id="accounttype">
            Seller Account
          </label>
        </div>
      )}

      {window.localStorage.getItem("isAuthenticated") === "true" && window.localStorage.getItem("isBuyer") === "true" && (
        <label style={{ marginLeft: "10px" }} id="accounttype2">
          Buyer Account
        </label>
      )}
    </div>
    </>
  )
}

export default Head