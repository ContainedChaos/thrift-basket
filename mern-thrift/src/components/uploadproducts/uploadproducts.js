import React, { useState } from "react"
import "./uploadproducts.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../common/header/Navbar"

const Uploadproducts = ({userCart, isAuthenticated, setIsAuthenticated}) => {

    const nav = useNavigate();

    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };

    const handleFileUpload = async () => {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("desc", desc);
        formData.append("uploader", token);
        formData.append("category", category); 

        const res = await axios.post("http://localhost:9002/upload", formData);
        console.log(res.data);

        // if (res.data.message === "Uploaded successfully") {
        //     nav("/")
        // }
    };

    return (
        <>
        <div className="upload">
            <h1>Add Product</h1>
            <div class="form-container">
            <div class="form-left">
            <input type="text" name="name" onChange={handleNameChange} placeholder="Enter the name of your product"></input>
            <input type="text" name="price" onChange={handlePriceChange}  placeholder="Enter the price of your product" ></input>
            <div class="desc-field">
                <span class="desc-label"></span>
                <textarea name="desc" onChange={handleDescChange} placeholder="Write a short description"></textarea>
            </div>
            </div>
            <div class="form-right">
            <select name="category" value={category} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                <option value="Dresses">Dresses</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Skirts">Skirts</option>
                <option value="Tops">Tops</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
            
            </select>
            <input type="file" id="file-input" name="img"  onChange={handleFileChange}/>
            <div className="button" onClick={handleFileUpload}>Upload</div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Uploadproducts