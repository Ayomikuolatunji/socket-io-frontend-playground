import React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const [messages, setMessages] = useState<any>([]);
  const [messageText, setMessageText] = useState("");
  const socketRef: any = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "64750bed5312296063d2fc2c" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "647b5210d88c8d46bea18c56");
    });
    socketRef.current.emit("fetchEvents", {
      schoolId: "64750bed5312296063d2fc2c",
      parentId: "647b5210d88c8d46bea18c56",
      eventType: "parentEvent",
    });
    socketRef.current.on("eventHistory", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("newEvent", (data: any) => {
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
