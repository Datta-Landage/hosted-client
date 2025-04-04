import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // ✅ Enabled!

const root = ReactDOM.createRoot(document.getElementById('root'));

const cloudURL = 'https://hosted-client.vercel.app';
const fallbackLAN = 'http://192.168.0.2';

// ✅ Try loading a cloud-hosted image (favicon) to verify internet
const testImage = new Image();
testImage.onload = () => {
  console.log('✅ Cloud reachable — rendering app normally');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
testImage.onerror = () => {
  console.warn('❌ Cloud unreachable. Checking if PWA offline mode is ready...');

  // If no service worker cache → redirect to LAN
  if (!navigator.serviceWorker) {
    console.warn('❌ No service worker available. Redirecting to LAN...');
    window.location.href = fallbackLAN;
  } else {
    console.log('📦 Service worker may serve cached content...');
    // Let the browser show cached PWA app if installed or precached
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};
testImage.src = `${cloudURL}/favicon.ico`;

// Optional: Redirect if you lose connection while browsing
window.addEventListener('offline', () => {
  console.warn('📡 Offline detected during session. Redirecting to LAN...');
  window.location.href = fallbackLAN;
});

reportWebVitals();

// ✅ Enable PWA support
serviceWorkerRegistration.register();
