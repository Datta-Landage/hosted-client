import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const fallbackURL = 'https://google.com'; // ✅ Redirect target (just for test)
const testURL = 'https://hosted-client.vercel.app'; // ✅ Cloud app you want to test

// ✅ Accurate test with timeout (2s)
async function checkCloudReachable() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    await fetch(testURL, {
      method: 'HEAD',
      mode: 'no-cors', // allow test to pass even without response body
      cache: 'no-store',
      signal: controller.signal,
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
    console.log('✅ Cloud reachable — rendering app');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.warn('❌ Cloud unreachable — redirecting to fallback');
    window.location.href = fallbackURL;
  }
})();

reportWebVitals();
