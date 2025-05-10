import { useState } from 'react';
import './MainTimer.css';
import MainTimerInput from './MainTimerInput';

const MainTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = () => {
      setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <MainTimerInput
        time={time}
        setTime={setTime}
        isRunning={isRunning}
      />
      <div className="timer-controls">
        {!isRunning && time > 0 && (
          <button onClick={handleStart} className="start-button">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={handleStop} className="stop-button">
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default MainTimer;
