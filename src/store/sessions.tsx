import { create } from 'zustand'

interface SessionState {
  sessions: number
}

type Action = {
  updateSession: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState & Action>((set, get) => ({
  sessions: 1,
  //valor inicial da sessao

  updateSession: () => set((state) => ({ sessions: state.sessions + 1 })),

  resetSession: () => set(() => ({ sessions: 1 }))
}))
