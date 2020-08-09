import React, { useState, useEffect } from 'react';
import './App.css';

const SECONDS_IN_MINUTE = 60;
const TURNS = Object.freeze({
  focus: Object.freeze({
    id: 'FOCUS',
    seconds: 25 * SECONDS_IN_MINUTE,
    label: 'focus',
  }),
  relax: Object.freeze({
    id: 'RELAX',
    seconds: 5 * SECONDS_IN_MINUTE,
    label: 'relax'
  }),
});

const formatTime = (seconds) => {
  const formattedMinutes = `${Math.trunc(seconds / 60)}`.padStart(2, '0');
  const formattedSeconds = `${seconds % 60}`.padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

const App = () => {
  const [turn, setTurn] = useState(TURNS.focus);
  const [secondsRemaining, setSecondsRemaining] = useState(turn.seconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setSecondsRemaining(turn.seconds);
  }, [turn]);
  
  useEffect(() => {
    if (isTimerRunning) {
      console.log("timer started");
    } else {
      console.log("timer stopped");
    }
  }, [isTimerRunning]);
  
  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }
    if (secondsRemaining <= 0) {
      setIsTimerRunning(false);
    }
    const timer = setTimeout(() => {
      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsRemaining, isTimerRunning]);
  
  const toggleIsTimerRunning = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => setSecondsRemaining(turn.seconds);
  const switchTurn = () => setTurn(turn.id === TURNS.focus.id ? TURNS.relax : TURNS.focus)

  return (
    <div className="timer">
      <div className="top-group">
        focus, relax, repeat
      </div>
      <div className={`mid-group ${isTimerRunning ? 'active' : 'inactive'}`}>
        <button
          className="switch"
          onClick={switchTurn}
          disabled={isTimerRunning}
        >
          switch
        </button>
        <div className="turn">{turn.label}</div>
        <div className="time">{formatTime(secondsRemaining)}</div>
        <button
          className="reset"
          onClick={resetTimer}
          disabled={isTimerRunning || secondsRemaining === turn.seconds}
        >
          reset
        </button>
      </div>
      <div className="bottom-group">
        
        <button
          onClick={toggleIsTimerRunning}
          disabled={secondsRemaining <= 0}
        >
          {isTimerRunning ? 'pause' : 'start'}
        </button>
      </div>
    </div>
  );
};

export default App;
