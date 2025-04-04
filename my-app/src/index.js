import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const cloudURL = 'https://hosted-client.vercel.app';
const fallbackLAN = 'http://192.168.0.2'; // 👈 Your LAN fallback

// 🌐 Test cloud reachability using favicon
const testImage = new Image();
testImage.onload = () => {
  console.log('✅ Cloud reachable — rendering app');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
testImage.onerror = () => {
  console.warn('❌ Cloud unreachable. Checking offline mode...');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(() => {
        console.log('📦 Service worker ready. Showing cached PWA...');
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
      })
      .catch(() => {
        console.warn('⚠️ No service worker ready. Redirecting to LAN...');
        window.location.href = fallbackLAN;
      });
  } else {
    console.warn('❌ Service Worker not supported. Redirecting to LAN...');
    window.location.href = fallbackLAN;
  }
};
testImage.src = `${cloudURL}/favicon.ico`;

// 🌐 Redirect if connection lost while using app
window.addEventListener('offline', () => {
  console.warn('📡 Offline detected during session. Redirecting to LAN...');
  window.location.href = fallbackLAN;
});

// ✅ Manual service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        console.log('✅ Service Worker registered:', reg.scope);
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}

reportWebVitals();
