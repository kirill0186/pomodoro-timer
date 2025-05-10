import { useState, useEffect, useRef } from 'react';
import './MainTimer.css';
import { formatInputToTime, formatTime, inputTimeToSeconds, sanitizeTimerValue } from '../../utils/timeFormat';

interface MainTimerInputProps {
  time: number;
  setTime: (value: number | ((prevTime: number) => number)) => void;
  isRunning: boolean;
}

const MainTimerInput = ({
  time,
  setTime,
  isRunning,
}: MainTimerInputProps) => {
  const [inputTime, setInputTime] = useState<string>('');
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

  const handleBlur = () => {
    setIsFocused(false);
    setTime(inputTimeToSeconds(inputTime));
  }

  const displayTime = isRunning ? formatTime(time) : formatInputToTime(inputTime);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputTime}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="hidden-input"
        disabled={isRunning}
        maxLength={6}
      />
      <div className={`timer-display ${isFocused ? 'focused' : ''}`} onClick={handleDisplayClick}>
        <span className={time < 0 ? 'negative-time' : ''}>{displayTime}</span>
      </div>
    </div>
  );
};

export default MainTimerInput;
