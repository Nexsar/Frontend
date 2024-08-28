import "./App.css";
import "./index.css";
import WalletConnector from "./components/ui/WalletConnector.jsx";
import Button from "./components/ui/Button.jsx";
import { initWorker, removeWorker } from "./worker.js";

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <WalletConnector />
      </div>
      <div style={{ border: '1px solid red', padding: '10px' }}>
        <Button
          onClick={handleClick}
          label="Click Me"
          style={{ backgroundColor: 'green' }}
          className="my-custom-button"
        />
      </div>
    </div>
  );
}

export default App;
