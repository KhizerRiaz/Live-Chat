import { Animated } from "react-animated-css";
import React, { useEffect, useState } from "react";
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
  const [room, setroom] = useState([]);
  const [availableRoom, setavailableRoom] = useState("");
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [list1, setlist1] = useState([]);
  const [list2, setlist2] = useState([]);
  const [availRoom, setavailRoom] = useState("");
  const [searchroom, setsearchroom] = useState(false);
  const [assignroom, setassignroom] = useState(false);

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

    setsearchroom(true);
  };

  const GetRoom = async () => {
    if (assignroom === false) {
      await axios
        .get("http://localhost:3004/clients/room1list")
        .then((response) => setroom(response.data))
        .then((json) => json);

      await axios
        .get("http://localhost:3004/clients/room2list")
        .then((response) => setlist2(response.data))
        .then((json) => json);

      if (room !== null || list2 != null) {
        if (room.room !== undefined) {
          // console.log(room);
          console.log(room.room, "joinroom", typeof room.room);
          socket.emit("join_room", parseInt(room.room));
          setsearchroom(false);
          setShowChat(true);
          await axios
            .post(`http://localhost:3004/vendor_room/joinroom`, {
              room: parseInt(room.room),
            })
            .then((response) => response)
            .then((json) => json);
        }
        // else {
        //   // if(list2.room2 !== undefined){

        //     console.log(list2.room2);
        //     // setavailRoom(list2.room2);
        //     socket.emit("join_room", parseInt(list2.room2));
        //     setShowChat(true);
        //     await axios
        //     .post(`http://localhost:3004/vendors/room`, { room: parseInt(list2.room2) })
        //     .then((response) => response)
        //     .then((json) => json);
        //     setsearchroom(false);

        //   // }
        // }

        setassignroom(true);
      }
    }
  };

  // useEffect(() => {
  setInterval(() => {
    if (searchroom) {
      GetRoom();
    }
  }, 6000);
  // return () => clearInterval(interval);
  // });

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
          // rooms={parseInt(room.room)}
          rooms={1}
          email={email}
        />
      )}
    </div>
  );
};

export default UserRegister;
