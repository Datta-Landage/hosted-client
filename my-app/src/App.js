import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="animated-title">Welcome to HiPalz Cloud App</h1>
        <p className="animated-subtitle">
          Your gateway to seamless cloud and offline experiences.
        </p>

        {isOffline ? (
          <div className="offline-banner animated-banner">
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
        ) : (
          <div className="online-banner animated-banner">
            <p>✅ <strong>You are online</strong></p>
            <p>Enjoy the full cloud experience!</p>
          </div>
        )}
      </header>
      <footer className="App-footer">
        <p>© 2025 HiPalz Cloud App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;