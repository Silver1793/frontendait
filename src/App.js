import "./App.css";
import Hangman from "./components/Hangman";
import NavBar from "./components/NavBar";
import Trial from "./components/Trial";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <br />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Trial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
