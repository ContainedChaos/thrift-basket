import React from "react"
import "./homepage.css"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../common/header/Navbar"

const SellerHomepage = ({userCart, isAuthenticated, setIsAuthenticated}) => {
    
    const logout = () => {
        setIsAuthenticated(false);
        window.localStorage.clear();
    }

    return (
        <>
        <Navbar userCart={userCart} isAuthenticated={isAuthenticated}/>
        <div className="homepage">
            <h1>Welcome SELLER</h1>
            <div className="button" >
                <a href = "/uploadproducts"> Upload products </a>
            </div>
            <div className="button" >
                <a href = "/announcedrop"> Add a drop announcement </a>
            </div>
            <div className="button" >
                <a href = "/announceauction"> Add an auction announcement </a>
            </div>
            <div className="button" onClick={logout} >
                <a href = "/"> Logout </a>
            </div>
            {/* <a href = "/userprofile">Profile</a> */}
        </div>
        </>
    )
}

{/* <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div> */}

export default SellerHomepage