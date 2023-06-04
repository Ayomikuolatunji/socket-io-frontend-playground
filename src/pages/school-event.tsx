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
      socketRef.current.emit("userLogin", "64750bed5312296063d2fc2c");
    });
    socketRef.current.on("newEvent", (data: any) => {
      console.log("Received new event:", data);
    });
    socketRef.current.emit("fetchEvents", {
      schoolId: "64750bed5312296063d2fc2c",
      eventType: "schoolEvent",
    });
    socketRef.current.on("eventHistory", (data: any) => {
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
      schoolId: "64750bed5312296063d2fc2c",
      parentsInvited: [
        "6475bd67650745e042234e50",
        "6475be5c650745e042234eb9",
        "647b5210d88c8d46bea18c56",
        "647b4da4c4347d5a213938db",
      ],
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
