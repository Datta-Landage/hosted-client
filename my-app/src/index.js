import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ REMOVE or comment out serviceWorkerRegistration for now
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ⬇️ Wrap root in basic offline check
if (!navigator.onLine) {
  console.warn('🚫 Offline detected. Redirecting to LAN server...');
  window.location.href = 'http://192.168.0.2'; // 👈 Your self-hosted server
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Optional: monitor for future disconnects
window.addEventListener('offline', () => {
  console.warn('📡 Lost internet. Redirecting to local...');
  window.location.href = 'http://192.168.0.2';
});

reportWebVitals();
