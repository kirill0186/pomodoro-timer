import { create } from 'zustand';

interface TimerItem {
    id: number;
    seconds: number;
}

interface TimersStore {
    timers: TimerItem[];
    nextId: number;
    currentTimerId: number | null;
    addTimer: () => void;
    updateTimer: (id: number, seconds: number) => void;
    setCurrentTimer: (id: number | null) => void;
    getTimer: (id: number | null) => TimerItem | null;
}

export const useTimersStore = create<TimersStore>((set, get) => ({
    timers: [],
    nextId: 1,
    currentTimerId: null,
    addTimer: () => set((state) => ({
        timers: [...state.timers, { id: state.nextId, seconds: 0 }],
        nextId: state.nextId + 1,
    })),
    updateTimer: (id: number, seconds: number) => set((state) => ({
        timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, seconds } : timer
        ),
    })),
    setCurrentTimer: (id: number | null) => set({ currentTimerId: id }),
    getTimer: (id: number | null) => get().timers.find(timer => timer.id === id) || null,
})); 