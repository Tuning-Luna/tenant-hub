import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// 用户基本信息
interface UserInfo {
  id: string
  name: string
  avatar?: string
  role: string // 角色标识：admin, manager, staff
}

// 租户/公司信息 (SaaS 核心)
interface TenantInfo {
  id: string
  name: string
  logo: string
  themeColor?: string
}

export interface AuthState {
  token: string | null
  userInfo: UserInfo | null
  tenantInfo: TenantInfo | null
  permissions: string[] // 权限列表，例如 ['user:list', 'report:export']
  isLogin: boolean

  // Actions
  setAuth: (data: {
    token: string
    user: UserInfo
    tenant: TenantInfo
    permissions: string[]
  }) => void
  clearAuth: () => void
  updateTenant: (tenant: Partial<TenantInfo>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      tenantInfo: null,
      permissions: [],
      isLogin: false,

      // 登录成功后一次性设置所有状态
      setAuth: (data) =>
        set({
          token: data.token,
          userInfo: data.user,
          tenantInfo: data.tenant,
          permissions: data.permissions,
          isLogin: true,
        }),

      // 退出登录清空所有
      clearAuth: () =>
        set({
          token: null,
          userInfo: null,
          tenantInfo: null,
          permissions: [],
          isLogin: false,
        }),

      // 允许单独更新租户信息（比如切换主题或公司名）
      updateTenant: (tenant) =>
        set((state) => ({
          tenantInfo: state.tenantInfo
            ? { ...state.tenantInfo, ...tenant }
            : null,
        })),
    }),
    {
      name: "tenant-auth-storage", // 存储在 localStorage 的 key
      storage: createJSONStorage(() => localStorage),
    }
  )
)
