import { create } from "zustand"

export interface CounterState {
  count: number
  inc: () => void
  dec: () => void
  setCount: (qty: number) => void
}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  setCount: (qty) => set({ count: qty }),
}))
