export interface UserT {
  token: string
  user: {
    id: string
    username: string
    avatar?: string
    role: "super_admin" | "tenant_admin" | "staff"
  }
  tenant: {
    id: string
    name: string
    logo: string
    themeColor: string // SaaS 皮肤切换关键点
    isTrial: boolean // 是否试用期
  }
  // 核心：功能权限点
  permissions: string[] // 模块:资源:操作
}
