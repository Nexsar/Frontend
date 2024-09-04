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
import Encrypt from "./lit/components/encryptionDistributorData";
// import GenerateWrappedKey from "./lit/components/wrappedkey";
import SignupWagmi from "./lit/pages/signupWagmi";

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
          <Route path="/lit-sign" element={<SignupWagmi />} />
          <Route path="/sign" element={<Encrypt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
