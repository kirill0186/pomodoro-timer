import { useState, useRef } from 'react';
import { formatInputToTime, sanitizeTimerValue, formatOvertime } from '../../utils/timeFormat';

interface TimerListItemProps {
  upadteTimer: (time: string) => void;
  isDisabled?: boolean;
  overtime: number;
  time: string;
}

const TimerListItem = ({ upadteTimer, isDisabled = false, overtime, time }: TimerListItemProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const value = sanitizeTimerValue(e.target.value);
    upadteTimer(value);
  };

  const handleDisplayClick = () => {
    if (isDisabled) return;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    !isDisabled && setIsFocused(true);
  };

  const displayTime = formatInputToTime(time);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={time}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="hidden-input"
        maxLength={6}
        disabled={isDisabled}
      />
      <div
        className={`timer-display timer-list-item-display ${isFocused ? 'focused' : ''} ${isDisabled ? 'disabled' : ''}`}
        onClick={handleDisplayClick}
      >
        <span>{displayTime}</span>
        {overtime > 0 && <span className="overtime">{formatOvertime(overtime)}</span>}
      </div>
    </div>
  );
};

export default TimerListItem;
