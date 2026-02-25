import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { UserT } from "../types/user"

interface AuthState {
  user: UserT | null
  isLogin: boolean

  setUser: (user: UserT) => void
  resetUser: () => void

  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      hasPermission: (permission: string) => {
        return get().user?.permissions.includes(permission) || false
      },
    }),
    {
      name: "tenant-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
