import { useAuthStore } from "../stores/useAuthStore"
import { Navigate } from "react-router-dom"

// 权限守卫
// 检查用户是否有指定权限
export default function PermissionGuard({
  permission,
  children,
}: {
  permission: string
  children: React.ReactNode
}) {
  const user = useAuthStore((s) => s.user)

  if (!permission) return children

  if (!user?.permissions.includes(permission)) {
    return <Navigate to="/403" />
  }
  return children
}
