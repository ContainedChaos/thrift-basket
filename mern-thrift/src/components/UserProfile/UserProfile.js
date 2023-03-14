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
            <div>
                <b>Name:</b> {this.state.userData.name}
                <br/>
                <b>Email:</b> {this.state.userData.email}<br/>
                <b>Phone:</b> {this.state.userData.phone}<br/>
                <b>Role:</b> {this.state.userData.role}<br/>
                {/* <button onClick={this.logOut}>Log Out</button> */}

            </div>

        );
    }
}