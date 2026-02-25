// components/Permission.tsx
import type { ReactNode } from "react"
import { useAuthStore } from "../stores/useAuthStore"

interface Props {
  permission: string | string[]
  children: ReactNode
}

// 按钮级别权限控制
// e.g.： <Permission permission="tenant:user:add">
//   <Button type="primary">新增用户</Button>
// </Permission>
function Permission({ permission, children }: Props) {
  const permissions = useAuthStore((s) => s.user?.permissions || [])

  const hasPermission = Array.isArray(permission)
    ? permission.some((p) => permissions.includes(p))
    : permissions.includes(permission)

  if (!hasPermission) return null

  return <>{children}</>
}

export default Permission
