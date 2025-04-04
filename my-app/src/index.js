const root = ReactDOM.createRoot(document.getElementById('root'));

const cloudURL = 'https://hosted-client.vercel.app';

const checkCloudReachable = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    await fetch(cloudURL, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeout);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.warn('🌐 Cloud unreachable. Redirecting to LAN...');
    window.location.href = 'http://192.168.0.2';
  }
};

checkCloudReachable();

// Optional: monitor for disconnect after page load
window.addEventListener('offline', () => {
  console.warn('📡 Lost internet. Redirecting to local...');
  window.location.href = 'http://192.168.0.2';
});

reportWebVitals();
