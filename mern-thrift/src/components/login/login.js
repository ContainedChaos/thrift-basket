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
            if (res.data.message === "Login Successful") {
                nav("/homepage", {state:{id:user.email}})
            }
        })
    }

//NEW CODE ADEBA

// function Login() {
//     const navigate = useNavigate()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [ user, setUser] = useState({
//         email:"",
//         password:""
//     })


//     const handleChange = e => {
//         const { name, value } = e.target
//         setUser({
//             ...user,
//             [name]: value
//         })
//     }


//     const handleSubmit = () => {
//         console.log(email, password)
//         axios.post('http://localhost:9002/login',
//             {
//                 email: email,
//                 password: password
//             })
//             .then(res => {
//                 console.log(res.data)

//                 if (res.data.code === 500) {
//                     alert('User Not Found')
//                 }
//                 if (res.data.code === 404) {
//                     alert('Password is wrong')
//                 }
//                 if (res.data.code === 200) {
//                     // move to home
//                     navigate('/')
//                     localStorage.setItem('TOKEN', res.data.token)
//                     localStorage.setItem('EMAIL', res.data.email)
//                 }
//             }).catch(err => {
//                 console.log(err)
//             })
//     }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={Login}>Login</div>
            <div>or</div>
            <div className="reg_link">
                <a href="/register">Register</a>
            </div>
            <div className="forgot_pass">
                <a href="/forgotpassword">Forgot Password?</a>
            </div>

        </div>
    )
}

export default Login