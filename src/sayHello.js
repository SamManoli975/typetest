import React, {useState} from "react";
import {generate} from "random-words";

function Hello(){
    const [words, setWords] = useState(""); // State for storing words

    const RandomWords = () => {
        // Generate an array of 5 random words
        const generatedWords = generate({ exactly: 5, join: " " });

        // Update the state with the generated words
        setWords(generatedWords);
    };
    return(
        <div>
            <button onClick={RandomWords}>click to say hello</button>
            <h1>{words}</h1>
        </div>
    );
}

export default Hello;