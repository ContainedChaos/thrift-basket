import React, { useEffect, useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Validation from "./validation"

const Register = () => {

    const nav = useNavigate()

    const [errors, setError] = useState({})

    const [ user, setUser] = useState({
        name: "",
        email:"",
        phone:"",
        // role:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
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
        if (Object.keys(errors).length === 0 && user.name && user.phone && user.email && user.password && user.reEnterPassword) {
            register();
        }        
    }, [errors])

    const register = () => {
        const { name, email, phone, password, reEnterPassword } = user
        if( name && email && password && phone && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)
                if(res.data.message==="User already registered") {

                }
                else {
                    nav("/verify")
                }
            })
        } else {
            // alert("invalid input")
        } 
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            {errors.name && <p style={{color: "red", fontSize: "13px"}}>{errors.name}</p>}
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            {errors.email && <p style={{color: "red", fontSize: "13px"}}>{errors.email}</p>}
            <input type="text" name="phone" value={user.phone} placeholder="Your Phone Number" onChange={ handleChange }></input>
            {errors.phone && <p style={{color: "red", fontSize: "13px"}}>{errors.phone}</p>}
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            {errors.password && <p style={{color: "red", fontSize: "13px"}}>{errors.password}</p>}
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            {errors.reEnterPassword && <p style={{color: "red", fontSize: "13px"}}>{errors.reEnterPassword}</p>} 
            {/* <div className="user_roles">
                <input type="radio" value="buyer" name="role" onChange={ handleChange }/> I want to buy thrifted items!
                <input type="radio" value="seller" name="role" onChange={ handleChange }/> I want to sell thrifted items!
            </div> */}
            <div className="button" onClick={handleSubmit} >Register</div>
            <div>or</div>
            <div className="login_link">
                <a href="/login">Login</a>
            </div>
        </div>
    )
}

export default Register