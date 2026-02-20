import React from "react"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import TestPage from "../pages/test/TestPage"

export interface RouteConfig {
  path: string
  title: string
  icon?: React.ReactNode
  element?: React.ReactNode
  permission?: string
  children?: RouteConfig[]
  hidden?: boolean
}

import type { RouteObject } from "react-router-dom"

// 递归转换函数
export function transformRoutes(config: RouteConfig[]): RouteObject[] {
  return config.map((item) => ({
    path: item.path,
    element: item.element,
    children: item.children ? transformRoutes(item.children) : undefined,
  }))
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    title: "首页",
    element: <MainLayout />, // 根节点使用布局组件
    children: [
      {
        path: "", // 访问 / 时重定向到 dashboard
        title: "重定向",
        hidden: true,
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },
      {
        path: "dashboard",
        title: "控制台",
        icon: <DashboardOutlined />,
        element: <div>Dashboard Content</div>,
        permission: "dashboard:view",
      },
      {
        path: "analysis",
        title: "数据分析",
        icon: <BarChartOutlined />,
        element: <div>Analysis Content</div>,
        permission: "analysis:view",
      },
      {
        path: "users",
        title: "成员管理",
        icon: <UserOutlined />,
        permission: "user:view",
        children: [
          {
            path: "list", // 注意：子路由 path 建议写相对路径，即 "list" 而不是 "/users/list"
            title: "用户列表",
            element: <div>User List</div>,
            permission: "user:list",
          },
        ],
      },
      {
        path: "settings",
        title: "系统设置",
        icon: <SettingOutlined />,
        element: <div>Settings</div>,
        permission: "sys:admin",
      },
      {
        path: "test",
        title: "测试页面",
        icon: <SettingOutlined />,
        element: <TestPage />,
        permission: "sys:admin",
      },
    ],
  },
]

export const router = createBrowserRouter(transformRoutes(routes))
