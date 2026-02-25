import type { RouteObject } from "react-router-dom"
import PermissionGuard from "../components/PermissionGuard"
import type { RouteConfig } from "../types/route"

// 递归转换路由配置为 React Router 格式
// 然后使用 PermissionGuard 包裹
export function buildProtectedRoutes(config: RouteConfig[]): RouteObject[] {
  return config.map((item) => {
    // 基础路由对象
    const route: RouteObject = {
      path: item.path,
      // 如果有子路由，递归转换
      children: item.children ? buildProtectedRoutes(item.children) : undefined,
    }

    // 核心逻辑：如果有 element 且有 permission，进行包裹
    if (item.element) {
      route.element = item.permission ? (
        <PermissionGuard permission={item.permission}>
          {item.element}
        </PermissionGuard>
      ) : (
        item.element
      )
    }
    return route
  })
}
