import { create } from 'zustand';

interface TimerItem {
  id: number;
  seconds: number;
}

interface TimersStore {
  timers: TimerItem[];
  nextId: number;
  addTimer: () => void;
  updateTimer: (id: number, seconds: number) => void;
}

export const useTimersStore = create<TimersStore>((set) => ({
  timers: [],
  nextId: 1,
  addTimer: () => set((state) => ({
    timers: [...state.timers, { id: state.nextId, seconds: 0 }],
    nextId: state.nextId + 1,
  })),
  updateTimer: (id: number, seconds: number) => set((state) => ({
    timers: state.timers.map((timer) =>
      timer.id === id ? { ...timer, seconds } : timer
    ),
  })),
})); 