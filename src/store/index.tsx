import { create } from 'zustand'

type TimerMode = 'pomodoro' | 'break' | 'longBreak'

interface pomodoroState {
  type: TimerMode
  pomodoroTime: number
  intervalTime: number
  longIntervalTime: number
  setLongBreak: () => void
  setBreak: () => void
  // updatePomodoroTime: () => void
  // updateIntervalTime: () => void
  // updateLongIntervalTime: () => void
}

export const useTimerStore = create<pomodoroState>((set, get) => ({
  type: 'pomodoro',
  pomodoroTime: 25,
  intervalTime: 5,
  longIntervalTime: 15,
  setBreak: () => set((state) => ({ ...state, type: 'break' })),
  setLongBreak: () => set((state) => ({ ...state, type: 'longBreak' }))
}))
