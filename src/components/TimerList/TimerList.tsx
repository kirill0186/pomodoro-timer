import './TimerList.css';
import TimerListItem from './TimerListItem';
import { useTimersStore } from '../../store/timers/timersStore';

const TimerList = () => {
  const { timers, addTimer, updateTimer, currentTimerId, setCurrentTimer, resetAllTimersOvertime, deleteTimer } = useTimersStore();

  const handleRunTimers = () => {
    if (timers.length > 0) {
      resetAllTimersOvertime();
      setCurrentTimer(timers[0].id);
    }
  };

  const handleStopTimers = () => {
    setCurrentTimer(null);
  };

  const handleDeleteTimer = (id: number) => {
    if (currentTimerId === id) {
      setCurrentTimer(null);
    }
    deleteTimer(id);
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
              upadteTimer={(time: string) => updateTimer(timer.id, time)}
              isDisabled={timer.id === currentTimerId}
              overtime={timer.overtime}
              time={timer.time}
            />
            <button
              onClick={() => handleDeleteTimer(timer.id)}
              className="delete-timer-button"
              disabled={timer.id === currentTimerId}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList;
