import { useEffect } from 'react';
import { useSocket } from './context/socketContext.jsx';

function App() {
  const socket = useSocket();

  useEffect(() => {
    // console.log("Socket value:", socket);

    if (!socket) {
      // console.log("Socket not initialized yet");
      return;
    }

    const handleNotification = () => {
      alert("New registration");
    };

    socket.on("new-registration", handleNotification);

    return () => {
      socket.off("new-registration", handleNotification);
    };
  }, [socket]);

  return <div>home</div>;
}

export default App;
