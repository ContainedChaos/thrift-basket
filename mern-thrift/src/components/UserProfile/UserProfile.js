import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    axios
      .post(
        "http://localhost:9002/userprofile",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data, "userData");
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="user-profile">
        <h2>My Profile</h2>
        <label className="attribute">Name:</label>{" "}
        <label className="info">{userData.name}</label>
        <br />
        <label className="attribute">Email:</label>{" "}
        <label className="info">{userData.email}</label>
        <br />
        <label className="attribute">Phone:</label>{" "}
        <label className="info">{userData.phone}</label>
        <br />
        <label className="attribute">Role:</label>{" "}
        <label className="info">{userData.role}</label>
        <br />
        {(window.localStorage.getItem("isBuyer") !== "true") ? (
            <Link to = '/seereviews'>
                    <button>My Reviews </button>
                    </Link>
                ) : null}
      </div>
    </>
  );
};

export default UserProfile;
