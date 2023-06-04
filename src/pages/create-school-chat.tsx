import React from "react";
import {  useEffect, useRef } from "react";
import io from "socket.io-client";

const Index = () => {
  const socketRef: any = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { schoolId: "647d07ab514602c2d26f6c28" },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to the server");
      socketRef.current.emit("userLogin", "647d07ab514602c2d26f6c28");
    });
    socketRef.current.on("newChat", (data: any) => {
      console.log("Received new event:", data);
    });
    socketRef.current.emit("fetchUserChats", {
      userId: "647d07ab514602c2d26f6c28",
      userType: "school",
      userName:"sabis"
    });
    socketRef.current.on("userChats", (data: any) => {
      console.log(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const createEvent = () => {
    const eventData = {
      userId: "647d07ab514602c2d26f6c28",
      userType: "school",
      userName: "sabis",
      user: {
        name: "The user name of who they are chatting with either parent or teacher",
        selectedUserId: "The Id of who they are chatting with either parent or teacher",
        profilePicture: "The profile picture of who they are chatting with either parent or teacher",
      },
    };

    socketRef.current.emit("createUserChat", eventData);
  };

  return (
    <>
      <button onClick={createEvent}>Create Event</button>
    </>
  );
};

export default Index;
