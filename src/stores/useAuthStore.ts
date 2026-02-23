import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { UserT } from "../types/user"

interface AuthState {
  user: UserT | null
  isLogin: boolean

  setUser: (user: UserT) => void
  resetUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,

      setUser: (user) =>
        set({
          user,
          isLogin: true,
        }),

      resetUser: () =>
        set({
          user: null,
          isLogin: false,
        }),
    }),
    {
      name: "tenant-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
