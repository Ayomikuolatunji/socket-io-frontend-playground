import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [messageText, setMessageText] = useState("");
  const socketRef: any = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "64845984a54c67c196a1cd2c" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "6484c710d6c6006c9e2affc4");
    });
    socketRef.current.emit("fetchEvents", {
      schoolId: "64845984a54c67c196a1cd2c",
      parentId: "6484c710d6c6006c9e2affc4",
      eventType: "parentEvent",
    });
    socketRef.current.on("eventHistory", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("newEvent", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("socketError", (data: any) => {
      console.log(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <h1>First connected parent socket</h1>
    </>
  );
};

export default Index;
