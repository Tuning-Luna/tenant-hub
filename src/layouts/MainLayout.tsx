import React, { useState, useMemo } from "react"
import { Layout, Menu, theme } from "antd"
import { AppstoreOutlined } from "@ant-design/icons"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { routes, type RouteConfig } from "../config/routes"
import { useAuthStore } from "../stores/useAuthStore"

const { Header, Content, Sider } = Layout

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const userPermissions = useAuthStore((s) => s.user?.permissions || [])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 递归生成菜单项，根据用户权限过滤
  const getMenuItems = (configs: RouteConfig[], parentPath = ""): any[] => {
    const items: any[] = []

    configs.forEach((route) => {
      if (route.hidden) return
      // ✅ 权限过滤
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

  // 使用 useMemo 优化，只有当路由配置变化时才重新生成菜单
  const menuItems = useMemo(() => {
    // 找到包含页面定义的根配置（即 path 为 "/" 的那一项的 children）
    const rootRoute = routes.find((r) => r.path === "/")
    return getMenuItems(rootRoute?.children || routes)
  }, [userPermissions])

  const handleLogout = () => {
    useAuthStore.getState().resetUser()
    navigate("/login")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "#f0f2f5",
            borderRadius: 6,
          }}>
          {collapsed ? (
            <div
              style={{
                height: 32,
                margin: 16,
                borderRadius: 6,
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
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div onClick={handleLogout}>退出登录</div>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
