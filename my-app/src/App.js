import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Online'); // Tracks online/offline status

  useEffect(() => {
    const redirectToLAN = () => {
      const localIP = 'http://192.168.0.2'; // Replace with your LAN server IP
      console.log('Internet is down. Redirecting to LAN app...');
      window.location.href = localIP;
    };

    const updateStatus = () => {
      if (!navigator.onLine) {
        setStatus('Offline');
        redirectToLAN();
      } else {
        setStatus('Online');
      }
    };

    // Initial status check
    updateStatus();

    // Watch for online/offline changes
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const serverIP = event.target.elements[0].value;
    const port = event.target.elements[1].value;

    if (serverIP && port) {
      window.alert(`Testing connection to Server IP: ${serverIP}, Port: ${port}`);
    } else {
      window.alert('Please enter both Server IP and Port.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LAN Network Test</h1>
        <p>Test your offline server connection within the LAN network.</p>
        <p className={`status ${status.toLowerCase()}`}>
          Current Status: {status}
        </p>
        <form className="lan-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Server IP"
            className="form-input"
          />
          <input
            type="text"
            placeholder="Enter Port"
            className="form-input"
          />
          <button type="submit" className="test-button">
            Test Connection
          </button>
        </form>
      </header>
      <footer className="App-footer">
        <p>© 2025 LAN Network Tester. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;