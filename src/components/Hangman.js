import React from "react";
import { useState, useEffect } from "react";
import { chooseRandom } from "./words";
import axios from "axios";

function Hangman() {
  const [mistake, setMistake] = useState(0);
  const [word, setWord] = useState(""); //useState(chooseRandom());
  const [over, setOver] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const baseUrl = process.env.baseURL || "http://localhost:6001";
  const other = "https://richardthisisatest.herokuapp.com";

  useEffect(() => {
    axios.get(other + "/words").then(function (response) {
      setWord(response.data);
    });
  }, []);
  useEffect(() => {
    setOver(mistake > 6);
    guessWord();
    console.log(guessed);
  }, [mistake, guessed]);

  const guessWord = () => {
    return word
      .split("")
      .map((letter) => (guessed.includes(letter) ? letter : " _ "));
  };
  const reset = () => {
    console.log("HERE");
    axios.get(other + "/words").then(function (response) {
      setWord(response.data);
    });
    setOver(false);
    setGuessed([]);
    setMistake(0);
  };

  const handleButtonClick = (e) => {
    if (word.includes(e.target.value) === false) {
      setMistake((prev) => prev + 1);
    }
    setGuessed((old) => [...old, e.target.value]); //guessed.add(e.target.value));
  };

  const genButtonsAlpha = () => {
    const alphaFirst = "abcdefghijkl";
    return alphaFirst.split("").map((letter, index) => (
      <button
        className="btn-alpha"
        disabled={guessed.includes(letter)}
        key={index}
        value={letter}
        onClick={handleButtonClick}
      >
        {letter}
      </button>
    ));
  };

  const genButtonsSec = () => {
    const alphaSec = "mnopqrstuvwlyz";
    return alphaSec.split("").map((letter, index) => (
      <button
        className="btn-alpha"
        disabled={guessed.includes(letter)}
        key={index}
        value={letter}
        onClick={handleButtonClick}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div>
      <div className="centered">{word}</div>
      <div className="centered">
        <p>{guessWord()}</p>
      </div>
      <div className="centered">
        <p>Mistakes Made: {mistake}</p>
      </div>
      <div className="centered">{genButtonsAlpha()}</div>
      <div className="centered">{genButtonsSec()}</div>
      <div className="centered">
        <button className="btn-sub" onClick={reset}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Hangman;
