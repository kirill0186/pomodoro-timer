import { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const [inputTime, setInputTime] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (inputTime && !isRunning) {
      setTime(parseInt(inputTime) * 60); // Convert minutes to seconds
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
  };

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <div className="timer-input">
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Enter minutes"
          disabled={isRunning}
        />
      </div>
      <div className="timer-display">
        <span className={time < 0 ? 'negative-time' : ''}>{formatTime(time)}</span>
      </div>
      <div className="timer-controls">
        <button onClick={handleStart} disabled={isRunning || !inputTime}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer; 