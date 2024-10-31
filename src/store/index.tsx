import { create } from 'zustand'

export type TimerType = 'pomodoro' | 'break' | 'longBreak'

interface TimerState {
  minutes: number
  type: TimerType
  setTimerType: (type: TimerType) => void
}

type Action = {
  updateMinutes: (minutes: TimerState['minutes']) => void
}

export const useTimerStore = create<TimerState & Action>((set, get) => ({
  minutes: 25,
  type: 'pomodoro',
  setTimerType: (type) => {
    const time = type === 'pomodoro' ? 25 : type === 'break' ? 5 : 15
    set({ type, minutes: time })
  },
  updateMinutes: (minutes) => set(() => ({ minutes: minutes }))
}))
