import { useEffect, useRef } from 'react';  // 👈 also import useRef
import { useSocket } from './context/socketContext.jsx';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Lore from './pages/Lore/Lore.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const socket = useSocket();
  const notificationSound = useRef(null);  // 👈 useRef, not useState

  useEffect(() => {
    notificationSound.current = new Audio('/Noti Sound Sci-fi.wav');
    notificationSound.current.load();

    // Unlock audio playback on user interaction
    const unlockSound = () => {
      notificationSound.current.play().then(() => {
        notificationSound.current.pause();
        notificationSound.current.currentTime = 0;
      }).catch((err) => {
        console.log('Unlocking sound:', err.message);
      });

      document.removeEventListener('click', unlockSound);
      window.removeEventListener('scroll', unlockSound);
    };

    document.addEventListener('click', unlockSound);
    window.addEventListener('scroll', unlockSound);

    return () => {
      document.removeEventListener('click', unlockSound);
      window.removeEventListener('scroll', unlockSound);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      if (notificationSound.current) {
        notificationSound.current.play().catch((err) => {
          console.error('Error playing sound:', err);
        });
      }

      toast(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/your-image-path.png" 
            alt="New Registration" 
            style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%' }} 
          />
          <div>
            <strong>New Registration!</strong>
            <div>{data.message}</div>
          </div>
        </div>,
        { icon: false }
      );
    };

    socket.on("new-registration", handleNotification);

    return () => {
      socket.off("new-registration", handleNotification);
    };
  }, [socket]);

  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:coinName" element={<Profile />} />
      <Route path="/lore" element={<Lore />} />
    </Routes>

    <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      pauseOnHover
    />
  </>;
}

export default App;
