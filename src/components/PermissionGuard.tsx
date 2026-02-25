import { useAuthStore } from "../stores/useAuthStore"
import { Navigate } from "react-router-dom"

// 路由权限守卫
// 检查用户是否有指定权限
export default function PermissionGuard({
  permission,
  children,
}: {
  permission: string
  children: React.ReactNode
}) {
  const hasPermission = useAuthStore((s) => s.hasPermission(permission))

  if (!permission) return children

  if (!hasPermission) {
    return <Navigate to="/403" />
  }
  return children
}
