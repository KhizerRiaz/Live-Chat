import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io.connect("http://localhost:5000");

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [room, setroom] = useState("");
  const [availableRoom, setavailableRoom] = useState("");
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const avail = false;

  // useEffect(() => {
  //   const joinRoom = async() => {

  //   }

  // }, [])

  const JoinRoom = async () => {
    if (username == "" && email == "") {
      console.log("Please fill all the fields");
      toast.error("Please enter all your fields !");
      return;
    }

    await axios
      .post("http://localhost:3004/clients", {
        name: username,
        email: email,
        waiting: true,
      })
      .then((response) => console.log(response.data))
      .then((json) => json);

    await axios
      .post("http://localhost:3004/clients/checkroom", {
        room: room,
      })
      .then((response) => setavailableRoom(response.data))
      .then((json) => json);

    console.log(availableRoom);
    var num = availableRoom[0].availabler1;
    if (num === undefined) {
      num = availableRoom[0].availabler2;
    }
    console.log(num);

    if (num === true) {
      console.log("room available");
      socket.emit("join_room", parseInt(room));
      setShowChat(true);

      await axios
        .get(`http://localhost:3004/vendors/room`, { room: room })
        .then((response) => response)
        .then((json) => json);
    } else {
      console.log("room is not available", email);
      await axios
        .put(`http://localhost:3004/clients/${email}`, { waiting: false })
        .then((response) => response.data)
        .then((json) => json);
      navigate("/waitinglist");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>User Registration</h3>
          <input
            type="text"
            placeholder="Enter your Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Enter your Email..."
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Enter your Room..."
            onChange={(event) => {
              setroom(event.target.value);
            }}
          />
          <button onClick={JoinRoom}>Join Room</button>
          <ToastContainer />
        </div>
      ) : (
        <ChatBox
          socket={socket}
          username={username}
          room={parseInt(room)}
          email={email}
        />
      )}
    </div>
  );
};

export default UserRegister;
