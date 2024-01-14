import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds, startCountdown }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    
    useEffect(() => {
        if (startCountdown == false){
            setSeconds(initialSeconds);
        }
        // Exit early if countdown is finished or not started
        if (seconds <= 0 || !startCountdown) {
            return;
        }

        // Set up the timer
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clean up the timer
        return () => clearInterval(timer);
    }, [seconds, startCountdown]);

    // Format the remaining time
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    return (
        <div>
            <h1>Countdown Timer</h1>
            <p>{formatTime(seconds)}</p>
        </div>
    );
};

export default CountdownTimer;
