import { create } from 'zustand'

interface TimerState {
  minutes: number
  restMinutes: number
}

type Action = {
  updateMinutes: (minutes: TimerState['minutes']) => void
  updateRestMinutes: (minutes: TimerState['restMinutes']) => void
}

export const useMinutesStore = create<TimerState & Action>((set, get) => ({
  minutes: 2,

  restMinutes: 1,

  updateMinutes: (minutes) => set(() => ({ minutes: minutes })),

  updateRestMinutes: (minutes) => set(() => ({ minutes: minutes }))
}))
