import React, { useEffect, useState } from "react"
import "./proceed.css"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../common/header/Navbar"

const Proceed = ({userCart}) => {

    const nav = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        phone:"",
        address:"",
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
    }

    const totalPrice = useParams();

    // Inside your Proceed component
  
    const totalprice = useParams().totalPrice;

  const proceed = () => {
    const { name, email, phone, address } = user;
    const payload = {
      user: { name, email, phone, address },
      userCart
    };
    axios.post(`http://localhost:9002/checkout/${totalprice}`, payload)
    // axios.post(`http://localhost:9002/init`, payload)
    .then(response => {
        const redirectUrl = response.data.redirectUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl; // Redirect the user to the SSLCommerz gateway
        } else {
          console.error("Failed to get redirect URL");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  

    console.log(userCart)

    return (
        <>
        <div className="proceed">
            <h1>Proceed</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>

            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            
            <input type="text" name="phone" value={user.phone} placeholder="Your Phone Number" onChange={ handleChange }></input>
            
            <input type="text" name="address" value={user.address} placeholder="Your Address" onChange={ handleChange }></input>

            <div className="button" onClick={proceed} >Checkout</div>
        </div>
        </>
    )
}

export default Proceed