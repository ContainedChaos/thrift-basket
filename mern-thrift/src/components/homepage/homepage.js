import React from "react"
import "./homepage.css"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../common/header/Navbar"

const Homepage = ({userCart, setIsAuthenticated}) => {
    
    const logout = () => {
        setIsAuthenticated(false);
        window.localStorage.clear();
    }

    return (
        <>
        <Navbar userCart={userCart} />
        <div className="homepage">
            <h1>Welcome</h1>
            <div className="button" >
                <a href = "/announcements"> See Upcoming Drops </a>
            </div>
            <div className="button" >
                <a href = "/"> See Upcoming Auctions</a>
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

export default Homepage