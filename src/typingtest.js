//importing

import React, { useState, useEffect } from "react";
import { generate } from "random-words";
import CountdownTimer from "./timer";


//main function
function App() {
    //variables
    const [words, setWords] = useState("");//words
    const [userInput, setUserInput] = useState("");//the user input
    const [activeWordIndex, setActiveWordIndex] = useState(0);//the index of the word
    const [letterColors, setLetterColors] = useState([]);//the color of the letters
    const [startCountdown, setStartCountdown] = useState(false);//the boolean to start the countdown
    const [typedEntries, setTypedEntries] = useState(0);//how many letters the user types
    const [elapsedTime, setElapsedTime] = useState(0);//time since the user started typing
    const [startTime, setStartTime] = useState(null);//current time marked when the user hits start

    

    //reset function
    const reset = () => {
        //reseting the functions neccessary for the typing test
        setElapsedTime(0);
        setStartTime(null);
        setActiveWordIndex(0);
        setUserInput("");
        setStartCountdown(false);
    };

    //processing the users input function
    const processInput = (value, e) => {
        //when the index hits the limir
        if (activeWordIndex === words.split(" ").length -1 ) {
            // If the activeWordIndex is the last word index, disable further input
            return;
        }
        
        if (value.endsWith(" ")) {//if user enters space
            checkWord();
            // if (activeWordIndex === 29-1){
            //     reset();
            //     RandomWords();
                
            // }
        } else if (value.endsWith("08")) {
            console.log("Backspace pressed");
            // Handle Backspace key
        } else {
            
            setTypedEntries((typedEntries) => typedEntries + 1);//increment typedEntries
            setUserInput(value);
            updateLetterColors(); // Update letter colors immediately after each user input
            setStartCountdown(true);
        }
        if (!startTime) {

            setStartTime(new Date()); // Record start time on the first input
        }
    };

    //function check if the letter is correct
    const checkWord = () => {
        const currentWord = words.split(" ")[activeWordIndex].trim();//splitting the words and getting the current word
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

    //generating random words function
    const RandomWords = () => {
        const generatedWords = generate({ exactly: 29, join: " " });
        const initialColors = generatedWords.split(" ").map(() => []);
        setLetterColors(initialColors);
        setWords(generatedWords);
        setActiveWordIndex(0); // Reset activeWordIndex when generating new words
    };

    //check if the letter is correct
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

    //useEffect function
    useEffect(() => {
        updateLetterColors();
        if (startTime) {
            const now = new Date();
            const elapsedMilliseconds = now - startTime;
            const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
            setElapsedTime(elapsedSeconds);
        }
    }, [activeWordIndex, userInput,startTime]);

    //function to change the letter colors
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

    //return the component
    return (
        <div>
            {/* Displaying the countdown timer */}
            <CountdownTimer initialSeconds = {30} startCountdown={startCountdown}/>
            <p>WPM: {typedEntries / 5 / (elapsedTime || 1) * 60}</p>
            <p>TYPED ENTRIES: {typedEntries}</p>
            <p>ELAPSED TIME: {elapsedTime||1}</p>
            <p>DATE: {Date()}</p>
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
                {/* input of the user */}
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
//exporting
export default App;


