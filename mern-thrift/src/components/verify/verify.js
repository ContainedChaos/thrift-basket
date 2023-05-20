import React, { useState } from "react"
import "./verify.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../../common/header/Navbar"

const Verify = ({userCart}) => {

    const nav = useNavigate()

    const [ user, setUser] = useState({
        otp: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const verify = () => {
        const { otp } = user
        if(otp) {
            axios.post("http://localhost:9002/verify", user)
            .then( res => {
                alert(res.data.message)
               nav("/login")
            })
        } else {
            alert("Something went wrong")
        }
        
    }

    return (
        <>
        <div className="verify">
            <h1>Verify</h1>
            <input type="text" name="otp" value={user.otp} placeholder="Type your OTP" onChange={ handleChange }></input>
            <div className="button" onClick={verify}>Verify</div>
        </div>
        </>
    )
}

export default Verify