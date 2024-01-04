import React, {useState} from "react";//importing 
import {generate} from "random-words";//importing


//function to create new words
function Hello(){
    const [words, setWords] = useState(""); // State for storing words
    const [userInput, setUserInput] = useState("");

    const RandomWords = () => {
        // Generate an array of 5 random words
        const generatedWords = generate({ exactly: 29, join: " " });

        // Update the state with the generated words
        setWords(generatedWords);
    };
    return(
        <div>
            
            <div>
                <p >{words}</p>
                <input 
                    type="text"
                    value = {userInput}
                    onChange={(e) => setUserInput(e.target.value)}/>
            </div>
            <div className="newWordsButton">
                <button onClick={RandomWords}>click to generate new words</button>
            </div>
            
                
        </div>
    );
}

//exporting
export default Hello;