import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "gpt" ? "gpt" : "user"}`}>
            <div className="chat-message-center">
                {message.message}
            </div>
        </div>
    );
}

export default ChatMessage;
