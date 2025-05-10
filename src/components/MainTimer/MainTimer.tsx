import { useState, useEffect, useCallback } from 'react';
import './MainTimer.css';
import MainTimerInput from './MainTimerInput';
import { useTimersStore } from '../../store/timers/timersStore';

const MainTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { getTimer, setCurrentTimer, timers, currentTimerId } = useTimersStore();

  useEffect(() => {
    const currentTimer = getTimer(currentTimerId);

    if (currentTimer) {
      setTime(currentTimer.seconds);
      setIsRunning(true);
    } else {
      setTime(0);
      setIsRunning(false);
    }
  }, [currentTimerId]);

  const handlePrevTime = useCallback(
    (prevTime: number) => {
      if (prevTime === 0) {
        setIsRunning(false);

        const currentTimer = getTimer(currentTimerId);

        if (currentTimer) {
          const currentIndex = timers.findIndex(t => t.id === currentTimer.id);

          if (currentIndex < timers.length - 1) {
            setCurrentTimer(timers[currentIndex + 1].id);
          } else {
            setCurrentTimer(null);
          }
        }
      }
    },
    [time, isRunning, currentTimerId, timers, getTimer, setCurrentTimer]
  );

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentTimer(null);
  };

  return (
    <div className="timer-container">
      <h1>Pomodoro Timer</h1>
      <MainTimerInput time={time} setTime={setTime} isRunning={isRunning} handlePrevTime={handlePrevTime} />
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
