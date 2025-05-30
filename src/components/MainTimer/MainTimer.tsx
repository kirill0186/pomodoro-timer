import { useState, useEffect } from 'react';
import './MainTimer.css';
import MainTimerInput from './MainTimerInput';
import { useTimersStore } from '../../store/timers/timersStore';
import { inputTimeToSeconds } from '../../utils/timeFormat';

const MainTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { getTimer, setCurrentTimer, timers, currentTimerId, isTimerLast, setTimerOvertime } = useTimersStore();

  useEffect(() => {
    const currentTimer = getTimer(currentTimerId);

    if (currentTimer) {
      setTime(inputTimeToSeconds(currentTimer.time));
      setIsRunning(true);
    } else {
      setTime(0);
      setIsRunning(false);
    }
  }, [currentTimerId]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    const currentTimer = getTimer(currentTimerId);
    if (currentTimer && time < 0) {
      setTimerOvertime(currentTimer.id, Math.abs(time));
    }
    setIsRunning(false);
    setTime(0);
    setCurrentTimer(null);
  };

  const handleNextTimer = () => {
    const currentTimer = getTimer(currentTimerId);
    if (currentTimer) {
      if (time < 0) {
        setTimerOvertime(currentTimer.id, Math.abs(time));
      }
      
      const currentIndex = timers.findIndex(t => t.id === currentTimer.id);
      if (currentIndex < timers.length - 1) {
        setCurrentTimer(timers[currentIndex + 1].id);
      }
    }
  };

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <MainTimerInput time={time} setTime={setTime} isRunning={isRunning} />
      <div className="timer-controls">
        {!isRunning && time > 0 && (
          <button onClick={handleStart} className="start-button">
            Start
          </button>
        )}
        {isRunning && (
          <>
            <button onClick={handleStop} className="stop-button">
              Stop
            </button>
            {currentTimerId && !isTimerLast(currentTimerId) && (
              <button onClick={handleNextTimer} className="next-button">
                Next Timer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainTimer;
