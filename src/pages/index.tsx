import { TextField } from "@mui/material";
import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [messageText, setMessageText] = useState("");
  const socketRef: any = useRef(null);
  const object = {
    senderId: "64750bed5312296063d2fc2c",
    schoolId: "64750bed5312296063d2fc2c",
    receiverId: "6475bd67650745e042234e50",
    senderRole: "school",
  };
  const { senderId, schoolId, receiverId, senderRole } = object;
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId },
    });
    socketRef.current.on("newMessage", (message: any) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });
    socketRef.current.on("chatHistory", (history: any) => {
      setMessages(history);
    });
    socketRef.current.emit("userLogin", "64750bed5312296063d2fc2c");
    getChatHistory();
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
      {/* {messages.map((message: any) => (
        <div key={message._id}>
          {message.senderRef === "643adce1c49946817d7b5818" ? (
            <p>You: {message.message}</p>
          ) : (
            <p>
              {message.senderRole}: {message.message}
            </p>
          )}
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
