import React from 'react';
import './MessageBox.css';

const MessageBox = ({ message, onClose }) => {
  return (
    <div className="message-box">
      <div className="message-box-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default MessageBox;
