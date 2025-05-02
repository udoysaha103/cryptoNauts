import "./App.css";

import { useEffect, useRef } from 'react';  // 👈 also import useRef
import { useSocket } from './context/socketContext.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Lore from './pages/Lore/Lore.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  const socket = useSocket();
  const notificationSound = useRef(null);  // 👈 useRef, not useState

  useEffect(() => {
    notificationSound.current = new Audio('/Noti Sound Sci-fi.wav');
    notificationSound.current.volume = 0.2; // Set volume to 50%
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', height: 'fit-content', border: "4px solid #00F2D8", backgroundColor: "rgba(160,159,198, 0.2)", backdropFilter: "blur(10px)", borderRadius: "20px", padding: "1em 1em", cursor: "pointer" }} onClick={() => { navigate(`/profile/${data.message}`); }}>
          <img 
            src={`/${data.message}.png`} 
            alt="New Docked Coin" 
            style={{ width: '5em', height: '5em', marginRight: '1vw', borderRadius: '20px' }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <strong style={{fontSize: "1.25em", fontWeight: "bolder", wordWrap: "nowrap"}}>${data.message}</strong>
            <div style={{fontSize: "1em", fontWeight: 500, marginTop: "0.2vh", width: "fit-content"}}>has Docked</div>
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
      autoClose={8000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      pauseOnHover
    />
  </>;
}

export default App;
