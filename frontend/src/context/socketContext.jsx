import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL);

    socketInstance.on("connect", () => {
      // console.log("Socket connected");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      // console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
