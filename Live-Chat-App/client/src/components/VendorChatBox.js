import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
const socket = io.connect("http://localhost:5000");
const socket2 = io.connect("http://localhost:5000");

const VendorChatBox = ({ vendor, email, room1, room2 }) => {
  const JoinRoom = () => {
    socket.emit("join_room", parseInt(room1));
    socket2.emit("join_room", parseInt(room2));
  };

  return (
    <div>
      <div>
        {JoinRoom()}
        <ChatBox
          socket={socket}
          username={vendor}
          rooms={parseInt(room1)}
          email={email}
        />
        <ChatBox
          socket={socket2}
          username={vendor}
          rooms={parseInt(room2)}
          email={email}
        />
      </div>
    </div>
  );
};

export default VendorChatBox;
