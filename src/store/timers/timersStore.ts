import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerItem {
    id: number;
    time: string;
    overtime: number;
}

interface TimersStore {
    timers: TimerItem[];
    nextId: number;
    currentTimerId: number | null;
    addTimer: () => void;
    updateTimer: (id: number, time: string) => void;
    setCurrentTimer: (id: number | null) => void;
    getTimer: (id: number | null) => TimerItem | null;
    isTimerLast: (id: number | null) => boolean;
    setTimerOvertime: (id: number, overtime: number) => void;
    deleteTimer: (id: number) => void;
    resetAllTimersOvertime: () => void;
}

export const useTimersStore = create<TimersStore>()(
    persist(
        (set, get) => ({
            timers: [],
            nextId: 1,
            currentTimerId: null,
            addTimer: () => set((state) => ({
                timers: [...state.timers, { id: state.nextId, time: "", overtime: 0 }],
                nextId: state.nextId + 1,
            })),
            updateTimer: (id: number, time: string) => set((state) => ({
                timers: state.timers.map((timer) =>
                    timer.id === id ? { ...timer, time } : timer
                ),
            })),
            setCurrentTimer: (id: number | null) => set({ currentTimerId: id }),
            getTimer: (id: number | null) => get().timers.find(timer => timer.id === id) || null,
            isTimerLast: (id: number | null) => {
                if (!id) return false;
                const currentIndex = get().timers.findIndex(t => t.id === id);
                return currentIndex === get().timers.length - 1;
            },
            setTimerOvertime: (id: number, overtime: number) => set((state) => ({
                timers: state.timers.map((timer) =>
                    timer.id === id ? { ...timer, overtime } : timer
                ),
            })),
            deleteTimer: (id: number) => set((state) => ({
                timers: state.timers.filter(timer => timer.id !== id),
                currentTimerId: state.currentTimerId === id ? null : state.currentTimerId
            })),
            resetAllTimersOvertime: () => set((state) => ({
                timers: state.timers.map(timer => ({ ...timer, overtime: 0 }))
            })),
        }),
        {
            name: 'pomodoro-timers',
            partialize: (state) => ({ 
                timers: state.timers,
                nextId: state.nextId,
                currentTimerId: state.currentTimerId,
            }),
        }
    )
); 