import React, { useState, useCallback } from "react";
import BeautyStars from "beauty-stars";
import { useModal } from "react-hooks-use-modal";

const Temp = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [state, setstate] = useState(0);
  // var state = 0;
  return (
    <div>
      <div>
        <p>Modal is Open? {isOpen ? "Yes" : "No"}</p>
        <button onClick={open}>OPEN</button>
        <Modal>
          <div className="joinChatContainer">
            <h1>Rating</h1>
            <p>How helpful was this ?</p>
            <BeautyStars value={state} onChange={(value) => setstate(value)} />
            <button onClick={close}>CLOSE</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Temp;
