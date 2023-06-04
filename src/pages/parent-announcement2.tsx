import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const socketRef: any = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "64750bed5312296063d2fc2c" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "647b4da4c4347d5a213938db");
    });
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
    socketRef.current.on("newAnnouncement", (data: any) => {
      console.log("Received new announcement:", data);
    });
    socketRef.current.emit("fetchAnnouncement", {
      schoolId: "64750bed5312296063d2fc2c",
      announcementType: "parentAnnouncement",
      parentId: "647b4da4c4347d5a213938db",
    });
    socketRef.current.on("announcementHistory", (data: any) => {
      console.log(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return <h1>parent announcement</h1>;
};

export default Index;
