import { create } from 'zustand'

type TimerMode = 'pomodoro' | 'break' | 'longBreak'

type State = {
  type: TimerMode
  minutes: number
  seconds: number
}

type Action = {
  updateMinutes: (minutes: State['minutes']) => void
  updateSeconds: (seconds: State['seconds']) => void
}

export const useTimerStore = create<State & Action>((set, get) => ({
  type: 'pomodoro',
  minutes: 0,
  seconds: 5,
  updateMinutes: (minutes) => set(() => ({ minutes: minutes })),
  updateSeconds: (seconds) => set(() => ({ seconds: seconds }))
}))
