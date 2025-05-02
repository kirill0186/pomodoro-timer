import { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const [inputTime, setInputTime] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRunning) return;
      
      if (e.key >= '0' && e.key <= '9') {
        const newValue = (inputTime + e.key).slice(0, 6);
        setInputTime(newValue);
        setIsFocused(true);
      } else if (e.key === 'Backspace') {
        setInputTime(inputTime.slice(0, -1));
        setIsFocused(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputTime, isRunning]);

  const formatInputToTime = (numbers: string): string => {
    const padded = numbers.padStart(6, '0');
    
    const hours = padded.slice(0, 2);
    const minutes = padded.slice(2, 4);
    const seconds = padded.slice(4, 6);
    
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleDisplayClick = () => {
    if (!isRunning && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleStart = () => {
    if (inputTime && !isRunning) {
      const formattedTime = formatInputToTime(inputTime);
      const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTime(totalSeconds);
      setIsRunning(true);
      setIsFocused(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
    setIsFocused(false);
  };

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const remainingSeconds = absSeconds % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayTime = isRunning ? formatTime(time) : formatInputToTime(inputTime);

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <input
        ref={inputRef}
        type="text"
        value={inputTime}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (!inputTime) {
            setIsFocused(false);
          }
        }}
        className="hidden-input"
        disabled={isRunning}
        maxLength={6}
      />
      <div 
        className={`timer-display ${isFocused ? 'focused' : ''}`} 
        onClick={handleDisplayClick}
      >
        <span className={time < 0 ? 'negative-time' : ''}>{displayTime}</span>
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