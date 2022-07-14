import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VendorChatBox from "./VendorChatBox";

const VendorRegister = () => {
  const [vendor, setVendor] = useState("");
  const [room1, setRoom] = useState("");
  const [room2, setRoom2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showchat, setshowchat] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      vendor !== "" &&
      room1 !== "" &&
      room2 !== "" &&
      email !== "" &&
      password !== ""
    ) {
      // socket.emit("join_room", room);
      await axios
        .post("http://localhost:3004/vendors", {
          room1: room1,
          room2: room2,
          name: vendor,
          email: email,
          password: password,
          availabler1: true,
          availabler2: true,
        })
        .then((response) => console.log(response.data))
        .then((json) => json);
    }
    setshowchat(true);
  };

  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h3>Register as a Vendor</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            value={vendor}
            onChange={(event) => {
              setVendor(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Enter your Email..."
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Room 1..."
            value={room1}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Room 2..."
            value={room2}
            onChange={(event) => {
              setRoom2(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter your Password..."
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={(e) => handleRegister(e)}>Register</button>
        </div>
      ) : (
        <VendorChatBox
          vendor={vendor}
          email={email}
          room1={room1}
          room2={room2}
        />
      )}
    </div>
  );
};

export default VendorRegister;
