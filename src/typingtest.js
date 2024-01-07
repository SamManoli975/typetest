import React, { useState } from "react";
import { generate } from "random-words";

//main function
function App() {
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [activeWordIndex, setActiveWordIndex] = useState(0);

    //reset function to reset the index
    const reset = () => {
        setActiveWordIndex(0);
        setUserInput("");
    };

    //check the user space bar click
    const processInput = (value) => {
        if (value.endsWith(" ")) {
        checkWord();
        } else {
        setUserInput(value);
        }
    };
    //to check increment the active work index
    const checkWord = () => {
        const currentWord = words.split(" ")[activeWordIndex].trim();
        const enteredWord = userInput.trim();

        if (enteredWord === currentWord) {
        setActiveWordIndex((index) => index + 1);
        setUserInput("");
        }
    };

    //function to get random array of words
    const RandomWords = () => {
        const generatedWords = generate({ exactly: 29, join: " " });
        setWords(generatedWords);
    };

    //to check if the letter is correct
    const isCorrectLetter = (wordIndex, letterIndex) => {
        if (wordIndex === activeWordIndex) {
        const currentWord = words.split(" ")[wordIndex].trim();
        return userInput[letterIndex] === currentWord[letterIndex];
        }
        return false;
    };

    return (
        <div>
        <div>
            <p>
            {words.split(" ").map((word, index) => {
                
                return (
                <span key={index}>
                    {word.split("").map((letter, letterIndex) => (
                    <span
                        key={letterIndex}
                        style={{
                        color: isCorrectLetter(index, letterIndex) ? 'green' : 'red',//call the letter function
                        }}
                    >
                        {letter}
                    </span>
                    ))}
                    {index < words.split(" ").length - 1 && " "}{" "}
                    
                </span>
                
                );
            })}
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
            click to generate new words
            </button>
        </div>
        </div>
    );
}

export default App;
