import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
const socket = io.connect("http://localhost:5000");
const socket2 = io.connect("http://localhost:5000");

const VendorChatBox = ({ vendor, email, room1, room2 }) => {
  //   const [room1, setroom1] = useState(106);
  //   const [room2, setroom2] = useState(107);
  //   const [vendor, setroom] = useState("Vendor");
  //   const email = "abc@gmail.com";

  const JoinRoom = () => {
    socket.emit("join_room", parseInt(room1));
    socket2.emit("join_room", parseInt(room2));
  };

  const handleClick = () => {
    console.log(email);
    console.log(room2);
    JoinRoom();
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Click</button>
        {email}
      </div>
      <div>
        {JoinRoom()}
        <ChatBox
          socket={socket}
          username={vendor}
          room={parseInt(room1)}
          email={email}
        />
        <ChatBox
          socket={socket2}
          username={vendor}
          room={parseInt(room2)}
          email={email}
        />
      </div>
    </div>
  );
};

export default VendorChatBox;
