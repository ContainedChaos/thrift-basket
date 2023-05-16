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

        if (res.data.message === "Uploaded successfully") {
            nav("/")
        }
    };

    return (
        <>
        <Navbar CartItem={CartItem} isAuthenticated={isAuthenticated}/>
        <div className="upload">
            <h1>Add Product</h1>
            <div class="form-container">
            <div class="form-left">
            <input type="text" name="name" onChange={handleNameChange} placeholder="Enter the name of your product"></input>
            <input type="text" name="price" onChange={handlePriceChange}  placeholder="Enter the price of your product" ></input>
            <div class="desc-field">
                <span class="desc-label"></span>
                <textarea name="desc" placeholder="Write a short description"></textarea>
            </div>
            </div>
            <div class="form-right">
            <select name="category" value={category} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                <option value="Category 1">Dress</option>
                <option value="Category 2">Shirt</option>
                <option value="Category 3">Pant</option>
                <option value="Category 4">Skirt</option>
                <option value="Category 5">Top</option>
                <option value="Category 6">Shoes</option>
                <option value="Category 7">Bag</option>
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