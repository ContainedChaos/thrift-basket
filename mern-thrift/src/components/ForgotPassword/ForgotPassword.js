import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "./ForgotPassword.css"
import { useNavigate } from 'react-router';
import Navbar from '../../common/header/Navbar';

const ForgotPassword = ({userCart}) => {

    const nav = useNavigate();

    const [ user, setUser] = useState({
        email:"",
    })

    const setVal = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const sendLink = () => {
           
                axios.post("http://localhost:9002/sendpasswordlink", user)
                .then(res => {
                    alert(res.data.message)
                    nav("/passwordreset")

                    //setLoginUser(res.data.user)
                })

        // }
    }

    return (
        <>
        <Navbar userCart={userCart}/>
        <div className="forgotPass">
            <h1>Enter Your Email</h1>
            {/* {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password reset link sent successfully to your email</p> : ""} */}
            <input type="text" name="email" value={user.email} onChange={setVal} id="email" placeholder="Enter your Email"></input>
            <button className='btn' onClick={sendLink}>Send</button>
        </div>
        </>
    )
}

export default ForgotPassword