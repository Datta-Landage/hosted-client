import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const fallbackLAN = 'http://192.168.0.2';
const cloudURL = 'https://hosted-client.vercel.app';

// ✅ Accurate fetch check with timeout
async function checkCloudReachable() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    await fetch(`${cloudURL}/version.json`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    return false;
  }
}

(async () => {
  const online = await checkCloudReachable();

  if (online) {
    console.log('✅ Cloud is reachable, rendering app');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.warn('❌ Cloud unreachable, redirecting to LAN');
    window.location.href = fallbackLAN;
  }
})();

reportWebVitals();

// ✅ Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker registered:', reg.scope))
      .catch((err) => console.error('❌ SW registration failed:', err));
  });
}
