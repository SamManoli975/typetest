import React, { useState, useEffect } from "react";
import { generate } from "random-words";

function App() {
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [letterColors, setLetterColors] = useState([]);


    const CountdownTimer = ({ initialSeconds }) => {
        const [seconds, setSeconds] = useState(initialSeconds);
        
        useEffect(() => {
            // Exit early if countdown is finished
            if (seconds <= 0) {
                return;
            }
            
            // Set up the timer
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            
            // Clean up the timer
            return () => clearInterval(timer);
        }, [seconds]);
        
        // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
            const formatTime = (timeInSeconds) => {
            const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, '0');
            const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
        };
        
        return (
            <div>
                <h1>Countdown Timer</h1>
                <p>{formatTime(seconds)}</p>
            </div>
        );
    };


    const reset = () => {
        setActiveWordIndex(0);
        setUserInput("");
    };

    const processInput = (value,e) => {
        if (value.endsWith(" ")) {
            checkWord();
        }else if (e.key === "Backspace"){
            console.log("Backspace pressed");
        
        } else {
            setUserInput(value);
            updateLetterColors(); // Update letter colors immediately after each user input
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
        updateLetterColors(); // Update letter colors after checking the word
    };

    const RandomWords = () => {
        const generatedWords = generate({ exactly: 29, join: " " });
        const initialColors = generatedWords.split(" ").map(() => []);
        setLetterColors(initialColors);
        setWords(generatedWords);
        setActiveWordIndex(0); // Reset activeWordIndex when generating new words
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
    }, [activeWordIndex, userInput]);

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
                            {/* {index === activeWordIndex ? (
                                <strong>{word}</strong>
                            ) : (
                                word
                            )} */}
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
                    onChange={(e) => processInput(e.target.value,e)}
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
                <CountdownTimer initialSeconds={300} />
            </div>
        </div>
    );
    
}

export default App;


