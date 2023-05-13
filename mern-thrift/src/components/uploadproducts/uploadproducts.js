import React, { useState } from "react"
import "./uploadproducts.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../common/header/Navbar"

const Uploadproducts = ({CartItem, isAuthenticated, setIsAuthenticated}) => {

    const nav = useNavigate();

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };


    const handleFileUpload = async () => {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("desc", desc);
        formData.append("uploader", token);

        const res = await axios.post("http://localhost:9002/upload", formData);
        console.log(res.data);

        if (res.data.message === "Uploaded successfully") {
            nav("/")
        }
    };

    // const [ product, setProduct ] = useState({
    //     name:"",
    //     price:"",
    //     desc:"",
    //     img: "",
    //     uploader: "",
    // })

    // const handleChange = e => {
    //     const { name, value } = e.target
    //     setProduct({
    //         ...product,
    //         [name]: value
    //     })
    // }

 

    // const upload = () => {
    //     axios.post("http://localhost:9002/upload", product, token)
    //     .then(res => {
    //         // sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
    //         // sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);
    //         // window.localStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
            
    //         alert(res.data.message)
            // if (res.data.message === "Uploaded successfully") {
            //     nav("/")
            //     // nav("/userprofile")
            // }
    //     })
    // }


    return (
        <>
        <Navbar CartItem={CartItem} isAuthenticated={isAuthenticated}/>
        <div className="upload">
            <h1>Welcome SELLER</h1>

            <input type="text" name="name" onChange={handleNameChange} placeholder="Enter the name of your product"></input>
            <input type="text" name="price" onChange={handlePriceChange}  placeholder="Enter the price of your product" ></input>
            <input type="text" name="desc" onChange={handleDescChange}  placeholder="Write a small description" ></input>
            <input type="file" id="file-input" name="img"  onChange={handleFileChange}/>
    
            <div className="button" onClick={handleFileUpload}>Upload</div>

            {/* <div className="button" >
                <a href = "/uploadproducts"> Upload products </a>
            </div>
            <div className="button" >
                <a href = "/"> Add a drop announcement </a>
            </div> */}
            {/* <div className="button" onClick={logout} >
                <a href = "/"> Logout </a>
            </div> */}
            <a href = "/userprofile">Profile</a>
        </div>
        </>
    )
}

{/* <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div> */}

export default Uploadproducts