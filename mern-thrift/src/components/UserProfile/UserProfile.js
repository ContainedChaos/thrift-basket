import React, {useState, useContext} from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataProvider";

const UserProfile = ({ }) => {

    const nav = useNavigate();
    const { setAccount } = useContext(DataContext);
    const token = sessionStorage.getItem("accessToken");



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


    const UserProfile = () => {
        axios.get('http://localhost:9002/userprofile/:token', token)
            .then(res => {
                console.log(res.data)

                
            })
    }

    return (
        
        <div className="userprofile">
            <h1>Hello</h1>

        </div>
    )
}

export default UserProfile