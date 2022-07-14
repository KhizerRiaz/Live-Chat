import BeautyStars from "beauty-stars";
import { useModal } from "react-hooks-use-modal";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ChatBox({ socket, username, room, email }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const navigate = useNavigate();
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: parseInt(room),
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      await axios.post("http://localhost:3004/chat", {
        room: parseInt(room),
        author: username,
        message: currentMessage,
        email: email,
      });
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    console.log("firstMessage");
    socket.on("receive_message", (data) => {
      console.log("first");
      setMessageList((list) => [...list, data]);
      console.log(data, "message received");
    });
    console.log(messageList);
  }, [socket]);

  const handleLeave = async () => {
    // await axios
    // .get(`http://localhost:3004/vendors/room`,{"room": room})
    // .then((response) => (response.data))
    // .then((json) => json);

    socket.emit("leave_room");
    navigate("/");
  };
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [state, setstate] = useState(0);

  return (
    <div className="chat-window">
      <div>
        <div>
          <p>Do the Rating? {isOpen ? "Yes" : "No"}</p>
          <button onClick={open} className="button-leave">
            Leave Room
          </button>
          {/* <button onClick={open}>OPEN</button> */}
          <Modal>
            <div className="joinChatContainer">
              <h1>Rating</h1>
              <p>How helpful was this ?</p>
              <BeautyStars
                value={state}
                onChange={(value) => setstate(value)}
              />
              <button onClick={close}>Ok</button>
            </div>
          </Modal>
        </div>
      </div>

      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                key={uuidv4()}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatBox;

// import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
// // import './Chat.css'

// function ChatBox({ socket, username, room, email }) {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         <ScrollToBottom className="message-container">
//           {messageList.map((messageContent) => {
//             return (
//               <div
//                 className="message"
//                 id={username === messageContent.author ? "you" : "other"}
//               >
//                 <div>
//                   <div className="message-content">
//                     <p>{messageContent.message}</p>
//                   </div>
//                   <div className="message-meta">
//                     <p id="time">{messageContent.time}</p>
//                     <p id="author">{messageContent.author}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </ScrollToBottom>
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={currentMessage}
//           placeholder="Hey..."
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;
