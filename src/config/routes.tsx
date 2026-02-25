// routes.ts
import React from "react"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import type { RouteObject } from "react-router-dom"
import PermissionGuard from "../components/PermissionGuard"

import TestPage from "../pages/test/TestPage"
import Dashboard from "../pages/dashboard/Dashboard"
import Analysis from "../pages/analysis/Analysis"
import UserList from "../pages/userlist/UserList"
import Setting from "../pages/setting/Setting"

export interface RouteConfig {
  path: string
  title: string
  icon?: React.ReactNode
  element?: React.ReactNode
  permission?: string
  children?: RouteConfig[]
  hidden?: boolean
}

export const routes: RouteConfig[] = [
  // 直接定义具体的业务子路由，不要再套一层 "/" 和 MainLayout
  {
    path: "dashboard",
    title: "控制台",
    icon: <DashboardOutlined />,
    element: <Dashboard />,
    permission: "tenant:data:view",
  },
  {
    path: "analysis",
    title: "数据分析",
    icon: <BarChartOutlined />,
    element: <Analysis />,
    permission: "tenant:data:view",
  },
  {
    path: "users",
    title: "成员管理",
    icon: <UserOutlined />,
    permission: "tenant:user:view",
    children: [
      {
        path: "list",
        title: "用户列表",
        element: <UserList />,
        permission: "tenant:user:view",
      },
    ],
  },
  {
    path: "settings",
    title: "系统设置",
    icon: <SettingOutlined />,
    element: <Setting />,
    permission: "system:config:view",
  },
  {
    path: "test",
    title: "测试页面",
    icon: <SettingOutlined />,
    element: <TestPage />,
    permission: "system:tenant:add",
  },
]

// 递归转换路由配置为 React Router 格式并使用 PermissionGuard 包裹
export function transformRoutes(config: RouteConfig[]): RouteObject[] {
  return config.map((item) => {
    // 基础路由对象
    const route: RouteObject = {
      path: item.path,
      // 如果有子路由，递归转换
      children: item.children ? transformRoutes(item.children) : undefined,
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
