import { useAuthStore } from "../stores/useAuthStore"
import { Navigate } from "react-router-dom"

// 检查是否登录
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children
}
