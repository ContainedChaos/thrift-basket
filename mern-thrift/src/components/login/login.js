import React, {useState, useContext} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataProvider";
import Navbar from "../../common/header/Navbar";

const Login = ({ CartItem, setIsAuthenticated}) => {

    const nav = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            // sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
            // sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);
            // window.localStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
            window.localStorage.setItem("accessToken", res.data.accessToken);
            if (res.data.role === "buyer")
            {
                window.localStorage.setItem("isBuyer", true);
            }

            else
            {
                window.localStorage.setItem("isBuyer", false);
            }

            setIsAuthenticated(true);
            window.localStorage.setItem("isAuthenticated", true)
            alert(res.data.message)
            if (res.data.message === "Login Successful") {
                nav("/")
                // nav("/userprofile")
            }
            // else if(res.data.message === "Login Successful" && res.data.role === "seller")
            // {
            //     nav("/sellerhomepage")
            // }
        })
    }

    return (
        <>
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="reg_link">
                <a href="/register">Register</a>
            </div>
            <div className="forgot_pass">
                <a href="/forgotpassword">Forgot Password?</a>
            </div>

        </div>
        </>
    )
}

export default Login