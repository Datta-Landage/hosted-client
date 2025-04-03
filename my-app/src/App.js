import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeURL, setActiveURL] = useState('https://hosted-client.vercel.app'); // Default to cloud URL
  const cloudURL = 'https://hosted-client.vercel.app'; // Cloud URL (Vercel)
  const localURL = 'http://192.168.1.5'; // Local server URL

  // Function to check cloud server availability
  const checkCloudAvailability = async () => {
    try {
      console.log('Checking cloud server availability...');
      const response = await fetch(`${cloudURL}/index.html`, { method: 'HEAD', mode: 'no-cors' });

      if (response.ok) {
        console.log('Cloud server is reachable.');
        setActiveURL(cloudURL); // Cloud is reachable, continue with cloud
      } else {
        console.log('Cloud server is not reachable. Falling back to local server.');
        setActiveURL(localURL); // Fallback to local server if cloud is not reachable
      }
    } catch (err) {
      console.log('Error reaching cloud server. Falling back to local server.');
      setActiveURL(localURL); // If cloud is unreachable, fall back to local server
    }
  };

  // Check cloud server availability on component mount
  useEffect(() => {
    checkCloudAvailability();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
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

        <p>Current active server URL: {activeURL}</p>
        <p>Open this URL in a new tab to test: <a href={activeURL} target="_blank" rel="noopener noreferrer">{activeURL}</a></p>
      </header>
    </div>
  );
}

export default App;
