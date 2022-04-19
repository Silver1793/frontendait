import React from "react";
import { useState, useEffect } from "react";
import { chooseRandom } from "./words";
import axios from "axios";

function Hangman() {
  const [mistake, setMistake] = useState(0);
  const [word, setWord] = useState(""); //useState(chooseRandom());
  const [over, setOver] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [input, setInput] = useState("");
  const baseUrl = process.env.baseURL || "http://localhost:6001";
  const other = "https://infinite-hollows-22494.herokuapp.com/";

  useEffect(() => {
    axios.get(other /*baseUrl*/ + "/words").then(function (response) {
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
    axios.get(other /*baseUrl*/ + "/words").then(function (response) {
      setWord(response.data);
    });
    setOver(false);
    setGuessed([]);
    setMistake(0);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.includes(input) === false) {
      setMistake((prev) => prev + 1);
    }
    setGuessed((old) => [...old, input]); //guessed.add(e.target.value));
    console.log("HERE");
    setInput("");
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
      <form onSubmit={handleSubmit} className="centered">
        <input
          placeholder="Enter a Letter here"
          maxLength={1}
          onChange={handleChange}
          value={input}
          type="text"
          name="name"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Hangman;
