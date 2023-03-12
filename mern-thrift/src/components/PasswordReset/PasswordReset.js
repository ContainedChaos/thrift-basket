import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './PasswordReset.css'
import axios from 'axios';

const PasswordReset = () => {

    const nav = useNavigate();

    const [ user, setUser] = useState({
        otp: "",
        password:"",
        reEnterPassword: "",
    })


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const passwordreset = () => {
        const { otp, password, reEnterPassword } = user
        if(otp && password && reEnterPassword && password === reEnterPassword) {
            axios.post("http://localhost:9002/passwordreset", user)
            .then( res => {
                alert(res.data.message)
               nav("/login")
            })
        } else {
            alert("Something went wrong")
        }
        
    }

    
    return (

        <div className="passreset">
            <h1>Enter Your New Password</h1>
            {/* {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password reset link sent successfully to your email</p> : ""} */}
            <input type="text" name="otp" value={user.otp} id="otp" onChange={handleChange} placeholder="Enter your OTP"></input>
            <input type="password" name="password" value={user.password} id="password" onChange={handleChange} placeholder="Enter your new password"></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} id="reEnterPassword" onChange={handleChange} placeholder="Confirm your new password"></input>
            <button className='btn' onClick={passwordreset}>Send</button>
        </div>
    )
}

export default PasswordReset