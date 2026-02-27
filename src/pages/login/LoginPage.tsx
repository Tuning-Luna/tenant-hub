import { Button, Card, Space, Typography, Descriptions, message } from "antd" // 1. 引入 message
import { loginAPI } from "../../api/login"
import { useAuthStore } from "../../stores/useAuthStore"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react" // 引入 useState 处理 loading

const { Title, Text } = Typography

export default function LoginPage() {
  const isLogin = useAuthStore((s) => s.isLogin)
  const user = useAuthStore((state) => state.user)
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  // 添加 loading 状态，增强点击后的视觉反馈
  const [loading, setLoading] = useState(false)

  if (isLogin) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  async function handleLogin(role: string) {
    setLoading(true)
    // 创建一个可以手动销毁的加载提示
    const hide = message.loading("正在验证身份...", 0)

    try {
      const response = await loginAPI({
        username: role,
        password: "123456",
      })

      setUser(response)
      hide() // 销毁加载提示
      message.success("登录成功！欢迎回来") // 2. 成功提示

      navigate("/")
    } catch (error: any) {
      hide() // 销毁加载提示
      // 3. 错误提示：显示后端返回的错误或通用错误
      message.error(error?.response?.data?.message || "登录失败，请检查网络")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Card
        style={{
          width: 480,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
        styles={{
          body: { padding: "40px 36px" },
        }}>
        <Title
          level={3}
          style={{ textAlign: "center", marginBottom: 32, fontWeight: 600 }}>
          权限测试系统
        </Title>

        <Space
          orientation="vertical"
          size="large"
          style={{ width: "100%" }}>
          <Button
            type="primary"
            size="large"
            block
            loading={loading} // 绑定 loading 状态
            onClick={() => handleLogin("super_admin")}>
            超级管理员登录
          </Button>

          <Button
            size="large"
            block
            disabled={loading} // 防止并发点击
            onClick={() => handleLogin("tenant_admin")}>
            租户管理员登录
          </Button>

          <Button
            size="large"
            block
            disabled={loading}
            onClick={() => handleLogin("staff")}>
            普通员工登录
          </Button>
        </Space>

        <div style={{ marginTop: 36 }}>
          {user ? (
            <div
              style={{
                background: "#fafafa",
                padding: 16,
                borderRadius: 8,
                border: "1px solid #f0f0f0",
              }}>
              <Descriptions
                column={1}
                size="small">
                <Descriptions.Item label="Token">
                  {user.token}
                </Descriptions.Item>
                <Descriptions.Item label="用户名">
                  {user.user.username}
                </Descriptions.Item>
                <Descriptions.Item label="角色">
                  {user.user.role}
                </Descriptions.Item>
              </Descriptions>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">请选择角色进行快捷登录</Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
