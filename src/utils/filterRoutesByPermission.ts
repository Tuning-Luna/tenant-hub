import type { RouteConfig } from "../config/routes"

export function filterRoutesByPermission(
  routes: RouteConfig[],
  permissions: string[]
): RouteConfig[] {
  return routes
    .map((route) => {
      // 没有权限要求，直接返回
      if (!route.permission) {
        return {
          ...route,
          children: route.children
            ? filterRoutesByPermission(route.children, permissions)
            : undefined,
        }
      }

      // 有权限要求，检查是否符合
      if (permissions.includes(route.permission)) {
        return {
          ...route,
          children: route.children
            ? filterRoutesByPermission(route.children, permissions)
            : undefined,
        }
      }

      return null
    })
    .filter(Boolean) as RouteConfig[]
}
