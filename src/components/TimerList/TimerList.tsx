import './TimerList.css';
import TimerListItem from './TimerListItem';
import { useTimersStore } from '../../store/timers/timersStore';

const TimerList = () => {
  const { timers, addTimer, updateTimer, currentTimerId, setCurrentTimer } = useTimersStore();

  const handleRunTimers = () => {
    if (timers.length > 0) {
      setCurrentTimer(timers[0].id);
    }
  };

  const handleStopTimers = () => {
    setCurrentTimer(null);
  };

  return (
    <div className="timer-list">
      <div className="timer-list-controls">
        <button onClick={addTimer} className="add-timer-button">
          Add timer
        </button>
        {timers.length > 0 && !currentTimerId && (
          <button onClick={handleRunTimers} className="run-timers-button">
            Run Timers
          </button>
        )}
        {currentTimerId && (
          <button onClick={handleStopTimers} className="stop-timers-button">
            Stop Timers
          </button>
        )}
      </div>
      <div className="timer-items">
        {timers.map(timer => (
          <div key={timer.id} className={`timer-item ${timer.id === currentTimerId ? 'active' : ''}`}>
            <TimerListItem
              upadteTimer={(seconds: number) => updateTimer(timer.id, seconds)}
              isDisabled={timer.id === currentTimerId}
              overtime={timer.overtime}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList;
