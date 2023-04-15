import { TextField } from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socketRef: any = useRef(null);
  const object = {
    senderId: "642ffac70d25c17a0ff3eb70",
    schoolId: "642ffac70d25c17a0ff3eb70",
    receiverId: "643adce1c49946817d7b5818",
    senderRole: "school",
  };
  const { senderId, schoolId, receiverId, senderRole } = object;
  useEffect(() => {
    // Connect to the Socket.IO server
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId },
    });

    // Register event listeners for incoming messages and chat history
    socketRef.current.on("newMessage", (message: any) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    socketRef.current.on("chatHistory", (history: any) => {
      setMessages(history);
    });

    // Send a "userLogin" message to the server to associate the socket with the user ID
    socketRef.current.emit("userLogin", "642ffac70d25c17a0ff3eb70");

    // Request the chat history for the current sender/receiver pair
    getChatHistory();

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!messageText) return;
    const message = {
      message: messageText,
      senderId: senderId,
      receiverId,
      senderRole,
    };
    socketRef.current.emit("message", message);
    setMessageText("");
  };

  const getChatHistory = () => {
    socketRef.current.emit("getChatHistory", {
      senderId: senderId,
      receiverId,
      senderRole,
    });
  };

  console.log(messages);

  return (
    <>
      {/* {messages.map((message) => (
        <div key={message._id}>
          <p>{message.message}</p>
        </div>
      ))} */}
      <TextField
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </>
  );
};

export default Index;
