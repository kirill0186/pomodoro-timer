import './TimerList.css';
import TimerListItem from './TimerListItem';
import { useTimersStore } from '../../store/timers/timersStore';

const TimerList = () => {
  const { timers, addTimer, updateTimer } = useTimersStore();

  return (
    <div className="timer-list">
      <button onClick={addTimer} className="add-timer-button">
        Add timer
      </button>
      <div className="timer-items">
        {timers.map(timer => (
          <div key={timer.id} className="timer-item">
            <TimerListItem
              upadteTimer={(seconds: number) => updateTimer(timer.id, seconds)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerList; 