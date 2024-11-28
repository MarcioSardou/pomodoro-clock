import { create } from 'zustand'

interface TimerState {
  minutes: number
}

type Action = {
  updateMinutes: (minutes: TimerState['minutes']) => void
}

export const useMinutesStore = create<TimerState & Action>((set, get) => ({
  minutes: 1,
  updateMinutes: (minutes) => set(() => ({ minutes: minutes }))
}))
