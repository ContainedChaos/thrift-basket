import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Login = ({ setLoginUser}) => {

    //const nav = useNavigate()

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
            alert(res.data.message)
            //setLoginUser(res.data.user)
            //nav.push("/")
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
            <div className="button">Register</div>
            <p className="forgot-password text-right">
                <Link to={"/reset"}>Forgot password? </Link>
            </p>
            {/* <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                to={'/ForgotPass'}> Forget Password </Link> */}
        </div>
    )
}

export default Login