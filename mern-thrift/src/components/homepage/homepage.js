import React from "react"
import "./homepage.css"
import { useLocation, useNavigate } from "react-router-dom"

const Homepage = ({isUserAuthenticated}) => {
    const location = useLocation();
    const token = sessionStorage.getItem("accessToken");

    return (
        <div className="homepage">
            <h1>Hello {location.state.email}</h1>
            <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div>
            <a href = {`/userprofile/${token}`}>Profile</a>
        </div>
    )
}

{/* <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div> */}

export default Homepage