import React, { useState } from "react"
import "./announcedrop.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../common/header/Navbar"

const AnnounceDrops = ({CartItem, isAuthenticated, setIsAuthenticated}) => {

    const nav = useNavigate();

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    // For example, send the data to a server or update the state in the parent component

    // Reset the form fields
    setTitle("");
    setDescription("");
    setDateTime("");
    setPriceRange("");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};


    const handleFileUpload = async () => {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("priceRange", priceRange);
        formData.append("dateTime", dateTime);
        formData.append("description", description);
        formData.append("uploader", token);

        const res = await axios.post("http://localhost:9002/announcedrop", formData);
        console.log(res.data);

        if (res.data.message === "Announcement uploaded successfully") {
            nav("/")
        }
    };


    return (
        <>
        <Navbar CartItem={CartItem} isAuthenticated={isAuthenticated}/>
        <div className="upload">
            <h1>Welcome SELLER</h1>

            <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input type="file" id="file-input" name="img"  onChange={handleFileChange}/>
      </div>
      <div>
        <label htmlFor="dateTime">Date and Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="priceRange">Price Range:</label>
        <input
          type="text"
          id="priceRange"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
      </div>
      <div className="button" id = "uploadbutton" onClick={handleFileUpload}>Upload</div>
    </form>
            
            <a href = "/userprofile">Profile</a>
        </div>
        </>
    )
}

{/* <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div> */}

export default AnnounceDrops