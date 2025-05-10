import { useState, useEffect, useRef } from 'react';
import './MainTimer.css';
import { formatInputToTime, formatTime, inputTimeToSeconds, sanitizeTimerValue } from '../../utils/timeFormat';

const MainTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [inputTime, setInputTime] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime - 1);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeTimerValue(e.target.value);
    setInputTime(value);
  };

  const handleDisplayClick = () => {
    if (!isRunning && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleStart = () => {
    if (inputTime && !isRunning) {
      setTime(inputTimeToSeconds(inputTime));
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
    setIsFocused(false);
  };

  const displayTime = isRunning ? formatTime(time) : formatInputToTime(inputTime);

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <input
        ref={inputRef}
        type="text"
        value={inputTime}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="hidden-input"
        disabled={isRunning}
        maxLength={6}
      />
      <div className={`timer-display ${isFocused ? 'focused' : ''}`} onClick={handleDisplayClick}>
        <span className={time < 0 ? 'negative-time' : ''}>{displayTime}</span>
      </div>
      <div className="timer-controls">
        {(!isRunning && inputTime) && (
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
