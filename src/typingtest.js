import React, { useState, useEffect } from "react";
import { generate } from "random-words";
import CountdownTimer from "./timer";

function App() {
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [letterColors, setLetterColors] = useState([]);
    const [startCountdown, setStartCountdown] = useState(false);
    const [typedEntries, setTypedEntries] = useState(0);

    


    const reset = () => {
        setActiveWordIndex(0);
        setUserInput("");
        setStartCountdown(false);
    };

    const processInput = (value, e) => {
        if (value.endsWith(" ")) {
            checkWord();
        } else if (value.endsWith("08")) {
            console.log("Backspace pressed");
            // Handle Backspace key
        } else {
            setTypedEntries((typedEntries) => typedEntries + 1);
            setUserInput(value);
            updateLetterColors(); // Update letter colors immediately after each user input
            setStartCountdown(true);
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
            <CountdownTimer initialSeconds = {30} startCountdown={startCountdown}/>
            <p>{typedEntries/5/.5}</p>
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
                        setTypedEntries(0);
                        RandomWords();
                        reset();
                        < CountdownTimer initialSeconds={30} startCountdown={false}/>
                    }}
                >
                    Click to generate new words
                </button>
                
            </div>
            
        </div>
        
    );
    
}

export default App;


