import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const cloudURL = 'https://hosted-client.vercel.app';
const fallbackLAN = 'http://192.168.0.2'; // Your self-hosted server

// ✅ Use image test instead of fetch for reliable result
const testImageURL = `${cloudURL}/favicon.ico`;

const img = new Image();
img.onload = () => {
  console.log('✅ Cloud reachable — rendering app');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
img.onerror = () => {
  console.warn('❌ Cloud unreachable — redirecting to LAN');
  window.location.href = fallbackLAN;
};
img.src = testImageURL;

// Optional: also listen for disconnect after load
window.addEventListener('offline', () => {
  console.warn('📡 Network disconnected — redirecting to LAN');
  window.location.href = fallbackLAN;
});

reportWebVitals();
