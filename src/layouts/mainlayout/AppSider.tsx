import { useMemo, useState } from "react"
import { Layout, Menu } from "antd"
import { AppstoreOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"
import { routes } from "../../router/routes"
import type { RouteConfig } from "../../types/route"
import { useAuthStore } from "../../stores/useAuthStore"
import { theme } from "antd"
const { Sider } = Layout
function AppSider() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userPermissions = useAuthStore((s) => s.user?.permissions || [])

  // 获取 Ant Design 主题 token
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 使用 useMemo 优化，只有当路由配置变化时才重新生成菜单
  const menuItems = useMemo(() => {
    // 找到包含页面定义的根配置（即 path 为 "/" 的那一项的 children）
    const rootRoute = routes.find((r) => r.path === "/")
    return getMenuItems(rootRoute?.children || routes)
  }, [userPermissions])

  // 递归生成菜单项，根据用户权限过滤
  function getMenuItems(configs: RouteConfig[], parentPath = ""): any[] {
    const items: any[] = []

    configs.forEach((route) => {
      if (route.hidden) return
      // 权限过滤
      if (route.permission && !userPermissions.includes(route.permission)) {
        return
      }

      const fullPath = route.path.startsWith("/")
        ? route.path
        : `${parentPath}/${route.path}`.replace(/\/+/g, "/")

      const children = route.children
        ? getMenuItems(route.children, fullPath)
        : undefined

      if (route.title && (route.element || children?.length)) {
        items.push({
          key: fullPath,
          icon: route.icon,
          label: route.title,
          children: children?.length ? children : undefined,
        })
      } else if (children?.length) {
        items.push(...children)
      }
    })

    return items
  }

  return (
    <Sider
      collapsible
      theme="light"
      collapsed={collapsed}
      onCollapse={setCollapsed}>
      <div
        style={{
          height: 32,
          margin: 16,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
        {collapsed ? (
          <div
            style={{
              height: 32,
              margin: 16,
              borderRadius: borderRadiusLG,
              display: "flex", // 开启 Flex 布局
              alignItems: "center", // 垂直居中
              justifyContent: "center", // 水平居中
            }}>
            <AppstoreOutlined style={{ color: "#000", fontSize: 24 }} />
          </div>
        ) : (
          <h1
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 20,
              textAlign: "center",
              lineHeight: "32px",
              margin: 0,
            }}>
            Tenant Hub
          </h1>
        )}
      </div>
      <Menu
        // 选中的菜单项 key，确保能匹配当前地址栏
        selectedKeys={[location.pathname]}
        // 默认展开父级菜单
        defaultOpenKeys={["/users"]}
        mode="inline"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}

export default AppSider
