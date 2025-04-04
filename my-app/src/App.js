import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const redirectIfOffline = () => {
      if (!navigator.onLine) {
        console.warn('📡 Offline detected. Redirecting to Google...');
        window.location.href = 'https://google.com'; // Just for testing redirect
      }
    };

    // Run once on load
    redirectIfOffline();

    // Listen for future disconnects
    window.addEventListener('offline', redirectIfOffline);

    return () => {
      window.removeEventListener('offline', redirectIfOffline);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <h1>✅ You are online</h1>
      <p>If you disconnect internet, you’ll be redirected to <strong>Google</strong>.</p>
    </div>
  );
}

export default App;
