// routes.ts
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons"

import TestPage from "../pages/test/TestPage"
import Dashboard from "../pages/dashboard/Dashboard"
import Analysis from "../pages/analysis/Analysis"
import UserList from "../pages/userlist/UserList"
import Setting from "../pages/setting/Setting"

import type { RouteConfig } from "../types/route"

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
