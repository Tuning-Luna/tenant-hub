import type { UserT } from "../../types/user"

// 超级管理员
export const mockSuperAdminUser: UserT = {
  token: "ey...super_admin_secret",
  user: {
    id: "u_000",
    username: "系统总管",
    role: "super_admin",
  },
  tenant: {
    id: "platform_master",
    name: "SaaS 管理运营后台",
    logo: "https://cdn.com/platform-logo.png",
    themeColor: "#722ed1",
    isTrial: false,
  },
  permissions: [
    "system:user:add",
    "system:user:edit",
    "system:user:delete",
    "system:tenant:add",
    "system:tenant:edit",
    "system:tenant:delete",
    "system:config:view",
    "tenant:user:add",
    "tenant:user:edit",
    "tenant:user:delete",
    "tenant:user:view",
    "tenant:role:assign",
    "tenant:data:view",
    "tenant:data:export",
  ],
}

// 租户管理员
export const mockTenantAdminUser: UserT = {
  token: "ey...tenant_admin_secret",
  user: {
    id: "u_001",
    username: "租户管理员",
    role: "tenant_admin",
  },
  tenant: {
    id: "t_001",
    name: "租户A",
    logo: "https://cdn.com/tenant-a-logo.png",
    themeColor: "#20c997",
    isTrial: false,
  },
  permissions: [
    "tenant:user:add",
    "tenant:user:edit",
    "tenant:user:delete",
    "tenant:user:view",
    "tenant:role:assign",
    "tenant:data:view",
    "tenant:data:export",
  ],
}

// 普通员工
export const mockStaffUser: UserT = {
  token: "ey...staff_secret",
  user: {
    id: "u_002",
    username: "普通员工",
    role: "staff",
  },
  tenant: {
    id: "t_001",
    name: "租户A",
    logo: "https://cdn.com/tenant-a-logo.png",
    themeColor: "#20c997",
    isTrial: false,
  },
  permissions: ["tenant:user:view", "tenant:data:view"],
}
