// App.tsx
import { useMemo } from "react"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { useAuthStore } from "./stores/useAuthStore"
import { routes, transformRoutes } from "./config/routes"
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./layouts/MainLayout"
import RequireAuth from "./components/RequireAuth"
import ResultPage from "./pages/result/ResultPage"

export default function App() {
  const isLogin = useAuthStore((s) => s.isLogin)

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/login",
        element: isLogin ? (
          <Navigate
            to="/"
            replace
          />
        ) : (
          <LoginPage />
        ),
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
          // 2. 原有的业务路由
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
      // 修改原来的通配符路由，让它跳转到 404 页面而不是直接跳首页
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
  }, [isLogin])

  return <RouterProvider router={router} />
}
