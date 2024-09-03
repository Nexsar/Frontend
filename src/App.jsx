import "./App.css";
import "./index.css";
import SmartContractUI from "./components/SmartContractUI.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DistributorDashboard from "./pages/DistributorDashboard.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import Home from "./pages/Home.jsx";
import DistributorDashboard from "./pages/DistributorDashboard.jsx";
import SignUpView from "./lit/pages/index.jsx";
import LandingPage from "./pages/LandingPage";
import RegisterModal from "./pages/RegisterModal";
import { Analytics } from "./pages/Analytics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/distributor" element={<DistributorDashboard />} />
          <Route path="/lit" element={<SignUpView />} />
          <Route path="/register" element={<RegisterModal />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
