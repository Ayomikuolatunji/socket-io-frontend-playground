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
      socketRef.current.emit("userLogin", "64845984a54c67c196a1cd2c");
    });
    socketRef.current.on("newEvent", (data: any) => {
      console.log("Received new event:", data);
    });
    socketRef.current.emit("fetchEvents", {
      schoolId: "64845984a54c67c196a1cd2c",
      eventType: "schoolEvent",
    });
    socketRef.current.on("eventHistory", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("socketError", (data: any) => {
      console.log(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const createEvent = () => {
    const eventData = {
      title: "My Event testing",
      description: "Event Description",
      location: "Event Location",
      eventDate: new Date(),
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      schoolId: "64845984a54c67c196a1cd2c",
      parentsInvited: ["6484c710d6c6006c9e2affc4", "6484c6d7d6c6006c9e2affa2"],
      sessionRef: "6484d41823096a8e15436e5e",
      termRef: "6484d41823096a8e15436e60",
    };

    socketRef.current.emit("CreateEvent", eventData);
  };

  return (
    <>
      <button onClick={createEvent}>Create Event</button>
    </>
  );
};

export default Index;
