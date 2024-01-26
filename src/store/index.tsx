import { create } from 'zustand'

export type TimerMode = 'pomodoro' | 'break' | 'longBreak'

type State = {
  timerMode: TimerMode
  minutes: number
  seconds: number
}

type Action = {
  updateMinutes: (minutes: State['minutes']) => void
  updateSeconds: (seconds: State['seconds']) => void
  updateTimerMode: (seconds: State['timerMode']) => void
}

export const useTimerStore = create<State & Action>((set, get) => ({
  timerMode: 'pomodoro',
  minutes: 25,
  seconds: 0,
  updateMinutes: (minutes) => set(() => ({ minutes: minutes })),
  updateSeconds: (seconds) => set(() => ({ seconds: seconds })),
  updateTimerMode: (timerMode) => set(() => ({ timerMode: timerMode }))
}))
