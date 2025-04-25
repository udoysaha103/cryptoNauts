import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from './context/socketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </StrictMode>,
)
