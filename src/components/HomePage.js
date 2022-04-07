import React from "react";
import Hangman from "./Hangman";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="centered">
        <h1>HangMan</h1>
      </div>
      <div className="centered">
        <Hangman />
      </div>
    </div>
  );
}

export default HomePage;
