import React, {useState} from "react";//importing 
import {generate} from "random-words";//importing


//function to create new words
function App(){
    const [words, setWords] = useState(""); // State for storing words
    const [userInput, setUserInput] = useState("");
    const [activeWordIndex,setActiveWordIndex] = useState(0);

    
    function processInput(value){
        if(value.endsWith(' ')){
            setActiveWordIndex(index => index+1)
            setUserInput(' ')
        }else{
            setUserInput(value)
        }
    }
    const RandomWords = () => {
        // Generate an array of 5 random words
        const generatedWords = generate({ exactly: 29, join: " " });

        // Update the state with the generated words
        setWords(generatedWords);
    };
    return(
        <div>
            
            <div>
                {/* <p >{words}</p> */}
                <p>{words.split(" ").map((word, index) => {
                    if(index === activeWordIndex){
                        return <b className="bold">{word} </b>
                    }

                    return <span>{word} </span>
                })}</p>
                <input 
                    className="inputBox"
                    type="text"
                    value = {userInput}
                    onChange={(e) => processInput(e.target.value)}/>
            </div>
            <div className="newWordsButton">
                <button className='generateButton' onClick={() => { RandomWords()}}>
                    click to generate new words
                </button>
            </div>
            
                
        </div>
    );
}

//exporting
export default App;