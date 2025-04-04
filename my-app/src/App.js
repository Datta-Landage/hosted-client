import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    // Check immediately on load (in case event missed)
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  return (
    <div className="App">
      <h1>HiPalz Cloud App</h1>

      {isOffline && (
        <div className="offline-banner">
          <p>🚫 <strong>You are offline</strong></p>
          <p>Tap below to use your offline version (LAN):</p>
          <a
            className="offline-btn"
            href="http://192.168.0.2"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔄 Open Local App
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
