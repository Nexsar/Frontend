import "./App.css";
import "./index.css";
import { Navbar } from "./pages/Navbar.jsx";

function App() {
  return (
    <div className="flex justify-center text-red-500">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Navbar />
    </div>
  );
}

export default App;
