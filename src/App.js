import "./App.css";
import "./index.css";
import WalletConnector from "./components/ui/WalletConnector.jsx";
import Button from "./components/ui/Button.jsx";
import { initWorker, removeWorker, getWorker } from "./worker.js";

function App() {
  const handleClick = () => {
    console.log("in Handler");
    getWorker("0x158b1ff33cdb34768aed6c8bf0461e875c738daf");
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <WalletConnector />
      </div>
      <div style={{ border: '1px solid red', padding: '10px' }}>
        <Button
          onClick={initWorker}
          label="InitWorker"
          style={{ backgroundColor: 'green' }}
          className="my-custom-button"
        />
      </div>
      <div style={{ border: '1px solid red', padding: '10px' }}>
        <Button
          onClick={handleClick}
          label="getWorker"
          style={{ backgroundColor: 'green' }}
          className="my-custom-button"
        />
      </div>
    </div>
  );
}

export default App;
