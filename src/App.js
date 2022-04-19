import "./App.css";
import Hangman from "./components/Hangman";
import NavBar from "./components/NavBar";
import Dictionary from "./components/Dictionary";
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
          <Route path="/dictionary" element={<Dictionary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
