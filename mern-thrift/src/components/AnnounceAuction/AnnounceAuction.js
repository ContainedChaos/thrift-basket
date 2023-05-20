import React, { useState } from "react"
import "./announceauction.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../common/header/Navbar"

const AnnounceAuction = ({CartItem, isAuthenticated, setIsAuthenticated}) => {

    const nav = useNavigate();

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startPrice, setStartPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    // For example, send the data to a server or update the state in the parent component

    // Reset the form fields
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setStartPrice("");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};


    const handleFileUpload = async () => {
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("startPrice", startPrice);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("description", description);
        formData.append("uploader", token);

        const res = await axios.post("http://localhost:9002/announceauction", formData);
        console.log(res.data);

        if (res.data.message === "Announcement uploaded successfully") {
            nav("/")
        }
    };


    return (
        <>
        <div className="announceauction">
            <h1>Auction Announcement</h1>

            <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Enter a title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          id="description"
          value={description}
          placeholder="Write a short description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <input type="file" id="file-input" name="img"  onChange={handleFileChange}/>
      </div>
      <div>
        <input
          type="text"
          id="startPrice"
          value={startPrice}
          placeholder="Enter a starting price"
          onChange={(e) => setStartPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="startTime">Starts on:</label>
        <div className="datetime-input">
        <input
          type="datetime-local"
          id="startdateTime"
          value={startTime}
          placeholder="Start Time"
          onChange={(e) => setStartTime(e.target.value)}
        />
        </div>
      </div>
      <div>
        <label htmlFor="endTime">Ends on:</label>
        <div className="datetime-input">
        <input
          type="datetime-local"
          id="enddateTime"
          value={endTime}
          placeholder="End Time"
          onChange={(e) => setEndTime(e.target.value)}
        />
        </div>
      </div>
      
      <div className="button" id = "uploadbutton" onClick={handleFileUpload}>Upload</div>
    </form>
        </div>
        </>
    )
}

{/* <div className="button" onClick={() => isUserAuthenticated(false)} >Logout</div> */}

export default AnnounceAuction