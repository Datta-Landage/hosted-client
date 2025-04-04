import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const redirectToLAN = () => {
      const localIP = 'http://192.168.1.5'; // Replace with your LAN server IP
      console.log('Internet is down. Redirecting to LAN app...');
      window.location.href = localIP;
    };

    // Auto check on load
    if (!navigator.onLine) {
      redirectToLAN();
    }

    // Watch for going offline
    window.addEventListener('offline', redirectToLAN);

    return () => window.removeEventListener('offline', redirectToLAN);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to the Vercel App</h1>
      <p>If offline, you will be redirected to your local server.</p>
    </div>
  );
}

export default App;
