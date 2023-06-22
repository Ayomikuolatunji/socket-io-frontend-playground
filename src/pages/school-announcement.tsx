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
      socketRef.current.emit("userLogin", "64845984a54c67c196a1cd2c");
    });
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
    socketRef.current.on("newAnnouncement", (data: any) => {
      console.log("Received new announcement:", data);
    });
    socketRef.current.emit("fetchAnnouncement", {
      schoolId: "64845984a54c67c196a1cd2c",
      announcementType: "schoolAnnouncement",
    });
    socketRef.current.on("announcementHistory", (data: any) => {
      console.log(data);
    });
    socketRef.current.on("socketError", (data: any) => {
      console.log(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const createAnnouncement = () => {
    const announcementData = {
      title: "New Announcement",
      description: "This is a new announcement",
      schoolId: "64845984a54c67c196a1cd2c",
      parentsIncluded: ["6484c710d6c6006c9e2affc4", "6484c6d7d6c6006c9e2affa2"],
      sessionRef: "6484d41823096a8e15436e5e",
      termRef: "6484d41823096a8e15436e60",
    };
    socketRef.current.emit("createAnnouncement", announcementData);
  };

  return (
    <div>
      <button onClick={createAnnouncement}>Create Announcement</button>
    </div>
  );
};

export default Index;
