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
logOut = () => {
    window.localStorage.clear(); // good practice to clear all details rather than just the token
    window.location.href = "./";
}
    render(){
        return(
            <>
            <Navbar userCart={this.props.userCart} />
            <div className="user-profile">
                <h2>My Profile</h2>
                <label className="attribute">Name:</label> <label className="info">{this.state.userData.name}</label><br/>
                <label className="attribute">Email:</label> <label className="info">{this.state.userData.email}</label><br/>
                <label className="attribute">Phone:</label> <label className="info">{this.state.userData.phone}</label><br/>
                <label className="attribute">Role:</label> <label className="info">{this.state.userData.role}</label><br/>
                <button id="logoutbtn" onClick={this.logOut}>Log Out</button>

            </div>
            </>
        );
    }
}