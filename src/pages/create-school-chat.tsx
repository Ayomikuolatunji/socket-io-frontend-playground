import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ChatComponent = () => {
  const socketRef: any = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "64845984a54c67c196a1cd2c" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "64845984a54c67c196a1cd2c");
    });

    socketRef.current.on("chatCreationError", (data: any) => {
      console.log(data);
    });
    socketRef.current.emit("fetchChats", "64845984a54c67c196a1cd2c");
    socketRef.current.on("chatsFetched", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("chatCreated", (data: any) => {
      console.log(data);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const createChat = () => {
    const newChat = {
      senderId: "64845984a54c67c196a1cd2c",
      receiverId: "6484c710d6c6006c9e2affc4",
      senderType: "school",
      receiverType: "parent",
      sessionRef: "6484d41823096a8e15436e5e",
      termRef: "6484d41823096a8e15436e60",
    };
    socketRef.current.emit("createChat", newChat);
  };

  return (
    <>
      <div>
        <button onClick={createChat}>Create a new chat</button>
      </div>
    </>
  );
};

export default ChatComponent;
