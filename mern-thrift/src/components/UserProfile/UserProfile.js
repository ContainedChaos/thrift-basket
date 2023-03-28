// import React, {Component, useState, useContext} from "react"
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from "../../context/DataProvider";
// import 

// const UserProfile = ({ }) => {

//     const nav = useNavigate();
//     const [userData, setUserData] = useState('')
//     const token = sessionStorage.getItem("accessToken");



// //NEW CODE ADEBA

// // function Login() {
// //     const navigate = useNavigate()
// //     const [email, setEmail] = useState('')
// //     const [password, setPassword] = useState('')
// //     const [ user, setUser] = useState({
// //         email:"",
// //         password:""
// //     })


// //     const handleChange = e => {
// //         const { name, value } = e.target
// //         setUser({
// //             ...user,
// //             [name]: value
// //         })
// //     }


//     const UserProfile = () => {
//         fetch("http://localhost:9002/userprofile",{
//             method: "POST",
//             crossDomain: true,
//             headers:{
//                 "Content-Type":"application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin": "*",
//             },
//             body: JSON.stringify({
//                 token: sessionStorage.getItem("accessToken"),
//             }),
//         })
//         .then((res) => res.json()) // convert data into JSON
//         .then((data) => {
//             // console.log(data, "userData");
//             // this.setState({userData: data.data});
//             setUserData(data)
//             if(data.data == 'Token Expired!'){
//                 alert("Token expired! Kindly login again."); 
//                 sessionStorage.clear();
//                 window.location.href = "./sign-in";
//             }
//         });
//     }

//     render()
//     return (
        
//         <div className="userprofile">
//             <b>Name:</b> {this.state.userData.name}
//                 <br/>
//                 <b>Email:</b> {this.state.userData.email}<br/>

//         </div>
//     )
// }

// export default UserProfile


import React, { Component } from "react";
import Navbar from "../../common/header/Navbar"; 
import "./UserProfile.css";
import logout from "../../components/homepage/homepage"

export default class UserProfile extends Component{
constructor(props){
    super(props);
    this.state = {
        userData: "",
    };
}

componentDidMount(){
    fetch("http://localhost:9002/userprofile",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                // token: sessionStorage.getItem("accessToken"),
                token: localStorage.getItem("accessToken"),
            }),
        })
        .then((res) => res.json()) // convert data into JSON
        .then((data) => {
            console.log(data, "userData");
            this.setState({userData: data.data});
            // if(data.data == 'Token Expired!'){
            //     alert("Token expired! Kindly login again."); 
            //     window.localStorage.clear();
            //     window.location.href = "./login";
            // }
        });
}
// logOut = () => {
//     window.localStorage.clear(); // good practice to clear all details rather than just the token
//     window.location.href = "./sign-in";
// }
    render(){
        return(
            <>
            <Navbar CartItem={this.props.CartItem} isAuthenticated={this.props.isAuthenticated}/>
            <div className="user-profile">
                <h2>My Profile</h2>
                <label className="attribute">Name:</label> <label className="info">{this.state.userData.name}</label><br/>
                <label className="attribute">Email:</label> <label className="info">{this.state.userData.email}</label><br/>
                <label className="attribute">Phone:</label> <label className="info">{this.state.userData.phone}</label><br/>
                <label className="attribute">Role:</label> <label className="info">{this.state.userData.role}</label><br/>
                {/* <button onClick={this.logOut}>Log Out</button> */}

            </div>
            {/* <div className="profile-button" onClick={logout} >
                <a href = "/"> Logout </a>
            </div> */}
            </>
        );
    }
}