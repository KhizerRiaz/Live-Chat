import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {v4 as uuid} from 'uuid';
const socket = io.connect("http://localhost:5000");

const VendorsListPanel = () => {
  const [vacant, setvacant] = useState([]);
  const [notvacant, setnotvacant] = useState([]);
  const navigate = useNavigate();

  const availability = async() =>{
    await axios
    .get("http://localhost:3004/clients/vacant")
    .then((response) => setvacant(response.data))
    .then((json) => json);

  await axios
    .get("http://localhost:3004/clients/notvacant")
    .then((response) => setnotvacant(response.data))
    .then((json) => json);

  }
  useEffect(() => {
    availability();  
  }, []);


  const handleLeave = async() => {

    // await axios
    // .get(`http://localhost:3004/vendors/room`,{"room": room})
    // .then((response) => (response.data))
    // .then((json) => json);

    socket.emit("leave_room");
    
    navigate("/");
    
  }

  return (
    <div className="container">
      <div className="joinChatContainer">
        <button onClick={handleLeave}>Leave Room</button>
        <h3>Waiting List</h3>
      <div className="vendors-list-panel">
        <div className="vendors-list">
          <h3>Available Vendors</h3>
            {vacant !== null ? (
              vacant.map((item) => <h4 key={uuid()}><strong>{item.name}</strong></h4>)
            ) : (
              <h1>None...</h1>
            )}
          <h3>Not Available Vendors </h3>
            {notvacant ? (
              notvacant.map((item) => <h4 key={uuid()}><strong>{item.name}</strong></h4>)
            ) : (
              <h1>None...</h1>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default VendorsListPanel;
