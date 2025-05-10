import { useState, useRef } from 'react';
import { formatInputToTime, inputTimeToSeconds, sanitizeTimerValue } from '../../utils/timeFormat';

interface TimerListItemProps {
  upadteTimer: (seconds: number) => void;
  isDisabled?: boolean;
}

const TimerListItem = ({
    upadteTimer,
    isDisabled = false,
}: TimerListItemProps) => {
  const [inputTime, setInputTime] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const value = sanitizeTimerValue(e.target.value);
    setInputTime(value);
  };

  const handleDisplayClick = () => {
    if (isDisabled) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;
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
        onFocus={() => !isDisabled && setIsFocused(true)}
        onBlur={() => {
          if (isDisabled) return;
          setIsFocused(false);
          upadteTimer(inputTimeToSeconds(inputTime));
        }}
        className="hidden-input"
        maxLength={6}
        disabled={isDisabled}
      />
      <div 
        className={`timer-display ${isFocused ? 'focused' : ''} ${isDisabled ? 'disabled' : ''}`} 
        onClick={handleDisplayClick}
      >
        <span>{displayTime}</span>
      </div>
    </form>
  );
};

export default TimerListItem;
