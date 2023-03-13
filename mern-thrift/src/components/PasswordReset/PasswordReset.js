import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Validation from './validation';
import './PasswordReset.css'
import axios from 'axios';

const PasswordReset = () => {

    const [errors, setError] = useState({})

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

    function handleSubmit(e) {
        e.preventDefault();
        setError(Validation(user));
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && user.otp && user.password && user.reEnterPassword && user.password === user.reEnterPassword) {
            passwordreset();
        }        
    }, [errors])

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
            {errors.otp && <p style={{color: "red", fontSize: "13px"}}>{errors.otp}</p>}
            <input type="password" name="password" value={user.password} id="password" onChange={handleChange} placeholder="Enter your new password"></input>
            {errors.password && <p style={{color: "red", fontSize: "13px"}}>{errors.password}</p>}
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} id="reEnterPassword" onChange={handleChange} placeholder="Confirm your new password"></input>
            {errors.reEnterPassword && <p style={{color: "red", fontSize: "13px"}}>{errors.reEnterPassword}</p>} 
            <button className='btn' onClick={handleSubmit}>Send</button>
        </div>
    )
}

export default PasswordReset