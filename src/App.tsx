import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { routes, transformRoutes } from "./config/routes"
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./layouts/mainlayout/MainLayout"
import RequireAuth from "./components/RequireAuth"
import ResultPage from "./pages/result/ResultPage"

// 将 router 定义在组件外部，它只会在应用加载时初始化一次
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },
      ...transformRoutes(routes),
    ],
  },
  {
    path: "/403",
    element: (
      <ResultPage
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问此页面。"
      />
    ),
  },
  {
    path: "/404",
    element: (
      <ResultPage
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
      />
    ),
  },
  {
    path: "*",
    element: (
      <Navigate
        to="/404"
        replace
      />
    ),
  },
])

export default function App() {
  // 2. App 组件变得非常干净，不再依赖 isLogin 来重新创建路由
  return <RouterProvider router={router} />
}
