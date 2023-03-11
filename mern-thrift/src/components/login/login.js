import React, {useState, useContext} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataProvider";

const Login = ({ isUserAuthenticated }) => {

    const nav = useNavigate();
    const { setAccount } = useContext(DataContext);

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
            sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);
            setAccount({ email: res.data.email});
            isUserAuthenticated(true);
            alert(res.data.message)
            //setLoginUser(res.data.user)
            nav("/homepage", {state:{id:user.email}})
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="reg_link">
                <a href="/register">Register</a>
            </div>

        </div>
    )
}

export default Login