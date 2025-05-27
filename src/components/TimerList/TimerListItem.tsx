import { useState, useRef } from 'react';
import { formatInputToTime, inputTimeToSeconds, sanitizeTimerValue } from '../../utils/timeFormat';

interface TimerListItemProps {
  upadteTimer: (seconds: number) => void;
  isDisabled?: boolean;
  overtime: number;
}

const TimerListItem = ({
    upadteTimer,
    isDisabled = false,
    overtime,
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
  const formatOvertime = (seconds: number): string => {
    if (seconds === 0) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `+${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
        className={`timer-display timer-list-item-display ${isFocused ? 'focused' : ''} ${isDisabled ? 'disabled' : ''}`} 
        onClick={handleDisplayClick}
      >
        <span>{displayTime}</span>
        {overtime > 0 && (
          <span className="overtime">{formatOvertime(overtime)}</span>
        )}
      </div>
    </form>
  );
};

export default TimerListItem;
