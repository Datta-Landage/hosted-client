import './App.css';

function App() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const serverIP = event.target.elements[0].value;
    const port = event.target.elements[1].value;

    if (serverIP && port) {
      window.alert(`Testing connection to Server IP: ${serverIP}, Port: ${port}`);
    } else {
      window.alert('Please enter both Server IP and Port.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LAN Network Test</h1>
        <p>Test your offline server connection within the LAN network.</p>
        <form className="lan-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Server IP"
            className="form-input"
          />
          <input
            type="text"
            placeholder="Enter Port"
            className="form-input"
          />
          <button type="submit" className="test-button">
            Test Connection
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;