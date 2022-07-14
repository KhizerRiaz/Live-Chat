import { Animated } from "react-animated-css";
import React, { useState } from "react";
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
  const [list1, setlist1] = useState([]);
  const [list2, setlist2] = useState([]);
  const [availRoom, setavailRoom] = useState("");
  const [availRoom2, setavailRoom2] = useState("");

  const JoinRoom = async () => {
    if (username === "" && email === "") {
      console.log("Please fill all the fields");
      toast.error("Please enter all your fields !");
      return;
    }

    await axios
      .post("http://localhost:3004/clients", {
        name: username,
        email: email,
        waiting: 1,
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
    // console.log(num);

    if (num === 0) {
      console.log("room available");
      socket.emit("join_room", parseInt(room));
      setShowChat(true);

      await axios
        .post(`http://localhost:3004/vendors/room`, { room: room })
        .then((response) => response)
        .then((json) => json);
    } else {
      console.log("room is not available", email);
      // setShowChat(false);
      // await axios
      //   .put(`http://localhost:3004/clients/${email}`, { waiting: 0 })
      //   .then((response) => response.data)
      //   .then((json) => json);

      if (availRoom) {
        socket.emit("join_room", parseInt(availRoom));
        setShowChat(true);
        await axios
          .post(`http://localhost:3004/vendors/room`, { room: availRoom })
          .then((response) => response)
          .then((json) => json);
      } else if (availRoom2) {
        socket.emit("join_room", parseInt(availRoom2));
        setShowChat(true);
        await axios
          .post(`http://localhost:3004/vendors/room`, { room: availRoom2 })
          .then((response) => response)
          .then((json) => json);
      } else {
        console.log("room is not available", email);
      }
    }
  };

  const GetRoom = async () => {
    await axios
      .get("http://localhost:3004/clients/room1list")
      .then((response) => setlist1(response.data))
      .then((json) => json);

    await axios
      .get("http://localhost:3004/clients/room2list")
      .then((response) => setlist2(response.data))
      .then((json) => json);

    if (list1 != null || list2 != null) {
      if (list1 != undefined) {
        console.log(list1.room1);
        setavailRoom(list1.room1);
        console.log(availRoom);
      } else {
        console.log(list2.room2);
        setavailRoom2(list2.room2);
        console.log(availRoom2);
      }
    }
  };

  setInterval(GetRoom, 6000);

  return (
    <div className="App">
      {!showChat ? (
        <div>
          <Animated
            animationIn="bounceInRight"
            animationOut="fadeOut"
            isVisible={true}
          >
            {" "}
            <h1>User Registration</h1>
            {/* <h1>Hello</h1> */}
          </Animated>
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div className="joinChatContainer">
              <Animated
                animationIn="bounceInRight"
                animationOut="fadeOut"
                isVisible={true}
              >
                <input
                  type="text"
                  placeholder="Enter your Name..."
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </Animated>
              <Animated
                animationIn="bounceInRight"
                animationOut="fadeOut"
                isVisible={true}
              >
                <input
                  type="email"
                  placeholder="Enter your Email..."
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Animated>

              <Animated
                animationIn="bounceInRight"
                animationOut="fadeOut"
                isVisible={true}
                component="input"
              >
                <input
                  type="number"
                  placeholder="Enter your Room..."
                  onChange={(event) => {
                    setroom(event.target.value);
                  }}
                />
              </Animated>
              <Animated
                animationIn="bounceInRight"
                animationOut="fadeOut"
                isVisible={true}
              >
                <button onClick={JoinRoom}>Join Room</button>
              </Animated>
              <ToastContainer />
            </div>
          </Animated>
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
