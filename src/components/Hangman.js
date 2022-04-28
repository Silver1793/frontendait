import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Hangman() {
  const [mistake, setMistake] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [word, setWord] = useState("");
  const [length, setLength] = useState(0);
  const [over, setOver] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [input, setInput] = useState("");
  const [highScore, setHighscore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const baseUrl = process.env.baseURL || "http://localhost:6001";
  const other = "https://infinite-hollows-22494.herokuapp.com/";

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(other /*baseUrl*/ + "words").then(function (response) {
        setWord(response.data.name);
        setLength(response.data.length);
      });
      await axios.get(/*baseUrl*/ other + "score").then(function (response) {
        setHighscore(response.data[0].score);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    setOver(mistake > 6);
    guessWord();
    let count = 0;
    word
      .toLowerCase()
      .split("")
      .map((letter) =>
        guessed.includes(letter) ? (count = count + 1) : count
      );
    setCorrect(count);
    if (currentScore > highScore) {
      axios
        .post(/*baseUrl */ other + "score", currentScore)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
      setHighscore(currentScore);
    }
  }, [guessed, highScore]);

  const guessWord = () => {
    // console.log(guessed);
    return word
      .toLowerCase()
      .split("")
      .map((letter) => (guessed.includes(letter) ? letter : " _ "));
  };
  const reset = async () => {
    await axios.get(other /*baseUrl*/ + "words").then(function (response) {
      setWord(response.data.name);
      setLength(response.data.length);
    });
    setOver(false);
    setGuessed([]);
    setMistake(0);
    setCorrect(0);
    setCurrentScore(0);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const next = async () => {
    await axios.get(other /*baseUrl*/ + "words").then(function (response) {
      setWord(response.data.name);
      setLength(response.data.length);
      setCurrentScore((prev) => prev + 1);
    });
    setOver(false);
    setGuessed([]);
    setMistake(0);
    setCorrect(0);
    // setCurrentScore(currentScore + 1);
    // if (currentScore >= highscore) {
    //   console.log("LOOK ATH THEEE " + currentScore);

    //   axios
    //     .post(baseUrl + "/score", currentScore)
    //     .then((response) => {
    //       console.log("success");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   setHighscore((prev) => prev + 1);
    // }
  };

  const handleButtonClick = (e) => {
    if (word.toLowerCase().includes(e.target.value) === false) {
      setMistake((prev) => prev + 1);
    } else {
      setCorrect((prev) => prev + 1);
    }
    setGuessed((old) => [...old, e.target.value]);
  };

  const genButtonsAlpha = () => {
    const alphaFirst = "abcdefghijkl";
    return alphaFirst.split("").map((letter, index) => (
      <button
        className="btn-alpha"
        disabled={guessed.includes(letter) || over || length <= correct}
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
    if (
      word.toLowerCase().includes(input.toLowerCase()) === false &&
      guessed.includes(input.toLowerCase()) === false
    ) {
      setMistake((prev) => prev + 1);
    } else if (
      word.includes(input.toLowerCase()) &&
      guessed.includes(input.toLowerCase()) === false
    ) {
      setCorrect((prev) => prev + 1);
    }
    if (guessed.includes(input.toLowerCase()) === false) {
      setGuessed((old) => [...old, input.toLowerCase()]);
    }
    // setGuessed((old) => [...old, input.toLowerCase()]);
    setInput("");
  };

  const genButtonsSec = () => {
    const alphaSec = "mnopqrstuvwlyz";
    return alphaSec.split("").map((letter, index) => (
      <button
        className="btn-alpha"
        disabled={guessed.includes(letter) || over || length <= correct}
        key={index}
        value={letter}
        onClick={handleButtonClick}
      >
        {letter}
      </button>
    ));
  };
  const overScreen = () => {
    if (over) {
      return (
        <h
          className="centered"
          style={{ fontWeight: "bold", fontSize: "30px" }}
        >
          GAME OVER
        </h>
      );
    }
  };

  return (
    <div>
      <div className="centered">
        <p>{guessWord()}</p>
      </div>
      <div className="centered">
        <p>Mistakes Made: {mistake}</p>
      </div>
      <div className="centered">
        <div className="tree">
          <p style={{ color: "blue" }}>High Score: {highScore} </p>
          <p style={{ color: "blue" }}>Current Score: {currentScore}</p>
        </div>
      </div>
      <div className="centered">{genButtonsAlpha()}</div>
      <div className="centered">{genButtonsSec()}</div>
      <div className="centered">
        <button
          className="btn-sub"
          onClick={reset}
          disabled={length <= correct}
        >
          Restart
        </button>
        <button className="btn-next" onClick={next} disabled={length > correct}>
          Next
        </button>
      </div>
      <form onSubmit={handleSubmit} className="centered">
        <input
          placeholder="Enter a Letter here"
          maxLength={1}
          disabled={over || length <= correct}
          onChange={handleChange}
          value={input}
          type="text"
          name="name"
        />
        <input
          type="submit"
          value="Submit"
          disabled={over || length <= correct}
        />
      </form>
      {overScreen()}
    </div>
  );
}

export default Hangman;
