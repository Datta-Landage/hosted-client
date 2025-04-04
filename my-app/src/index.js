import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Not using PWA yet

const root = ReactDOM.createRoot(document.getElementById('root'));

const cloudURL = 'https://hosted-client.vercel.app';
const fallbackLAN = 'http://192.168.0.2'; // 👈 Your self-hosted server IP

const checkCloudReachable = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    await fetch(cloudURL, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    console.log('✅ Cloud is reachable, rendering cloud app');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.warn('❌ Cloud unreachable, redirecting to LAN');
    window.location.href = fallbackLAN;
  }
};

checkCloudReachable();

// Optional: redirect if connection drops later
window.addEventListener('offline', () => {
  console.warn('📡 Internet dropped. Redirecting to LAN...');
  window.location.href = fallbackLAN;
});

reportWebVitals();
