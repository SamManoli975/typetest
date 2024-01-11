import React, { useState, useEffect } from "react";
import { generate } from "random-words";

function App() {
  const [words, setWords] = useState("");
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [letterColors, setLetterColors] = useState([]);

  const reset = () => {
    setActiveWordIndex(0);
    setUserInput("");
  };

  const processInput = (value) => {
    if (value.endsWith(" ")) {
      checkWord();
    } else {
      setUserInput(value);
    }
  };

  const checkWord = () => {
    const currentWord = words.split(" ")[activeWordIndex].trim();
    const enteredWord = userInput.trim();

    const newColors = [...letterColors];
    currentWord.split("").forEach((_, letterIndex) => {
      newColors[activeWordIndex][letterIndex] = isCorrectLetter(
        activeWordIndex,
        letterIndex
      )
        ? "green"
        : "red";
    });

    setLetterColors(newColors);

    setActiveWordIndex((index) => index + 1);
    setUserInput("");
  };

  const RandomWords = () => {
    const generatedWords = generate({ exactly: 29, join: " " });
    const initialColors = generatedWords.split(" ").map(() => []);
    setLetterColors(initialColors);
    setWords(generatedWords);
  };

  const isCorrectLetter = (wordIndex, letterIndex) => {
    if (wordIndex === activeWordIndex) {
      const currentWord = words.split(" ")[wordIndex].trim();
      return (
        letterIndex < currentWord.length &&
        userInput[letterIndex] === currentWord[letterIndex]
      );
    }
    return false;
  };

  useEffect(() => {
    updateLetterColors();
  }, [activeWordIndex]); // Run this effect whenever activeWordIndex changes

  const updateLetterColors = () => {
    const newColors = [...letterColors];
    if (!newColors[activeWordIndex]) {
      newColors[activeWordIndex] = [];
    }
    words.split(" ")[activeWordIndex].split("").forEach((_, letterIndex) => {
      newColors[activeWordIndex][letterIndex] = isCorrectLetter(
        activeWordIndex,
        letterIndex
      )
        ? "green"
        : "red";
    });

    setLetterColors(newColors);
  };

  return (
    <div>
      <div>
        <p>
          {words.split(" ").map((word, index) => (
            <span key={index}>
              {word.split("").map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  style={{
                    color: letterColors[index]
                      ? letterColors[index][letterIndex]
                      : "red",
                  }}
                >
                  {letter}
                </span>
              ))}
              {index < words.split(" ").length - 1 && " "}
            </span>
          ))}
        </p>
        <input
          className="inputBox"
          type="text"
          value={userInput}
          onChange={(e) => processInput(e.target.value)}
        />
      </div>
      <div className="newWordsButton">
        <button
          className="generateButton"
          onClick={() => {
            RandomWords();
            reset();
          }}
        >
          Click to generate new words
        </button>
      </div>
    </div>
  );
}

export default App;
