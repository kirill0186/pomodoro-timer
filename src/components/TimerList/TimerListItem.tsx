import { useState, useRef } from 'react';
import { formatInputToTime, inputTimeToSeconds, sanitizeTimerValue } from '../../utils/timeFormat';

interface TimerListItemProps {
  upadteTimer: (seconds: number) => void;
}

const TimerListItem = ({
    upadteTimer,
}: TimerListItemProps) => {
  const [inputTime, setInputTime] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeTimerValue(e.target.value);
    setInputTime(value);
  };

  const handleDisplayClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    upadteTimer(inputTimeToSeconds(inputTime))
    setIsFocused(false)
}

  const displayTime = formatInputToTime(inputTime);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={inputTime}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          upadteTimer(inputTimeToSeconds(inputTime));
        }}
        className="hidden-input"
        maxLength={6}
      />
      <div className={`timer-display ${isFocused ? 'focused' : ''}`} onClick={handleDisplayClick}>
        <span>{displayTime}</span>
      </div>
    </form>
  );
};

export default TimerListItem;
