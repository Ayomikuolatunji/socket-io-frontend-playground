import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const socketRef: any = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "64845984a54c67c196a1cd2c" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "6484c710d6c6006c9e2affc4");
    });
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
    socketRef.current.on("newAnnouncement", (data: any) => {
      console.log("Received new announcement:", data);
    });
    socketRef.current.emit("fetchAnnouncement", {
      schoolId: "64845984a54c67c196a1cd2c",
      announcementType: "parentAnnouncement",
      parentId: "6484c710d6c6006c9e2affc4",
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
