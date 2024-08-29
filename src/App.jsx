import "./App.css";
import "./index.css";
import SmartContractUI from "./components/SmartContractUI.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DistributorDashboard from "./pages/DistributorDashboard.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import Home from "./pages/Home.jsx";
import DistributorDashboard from "./pages/DistributorDashboard.jsx";
import LitPage from "./lit/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/distributor" element={<DistributorDashboard />} />
          <Route path="/lit" element={<LitPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
