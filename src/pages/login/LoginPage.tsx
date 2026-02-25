import { Button, Card, Space, Typography, Descriptions } from "antd"
import { loginAPI } from "../../api/login"
import { useAuthStore } from "../../stores/useAuthStore"
import { Navigate, useNavigate } from "react-router-dom"

const { Title, Text } = Typography

export default function LoginPage() {
  const isLogin = useAuthStore((s) => s.isLogin)
  const user = useAuthStore((state) => state.user)
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  if (isLogin) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  async function handleLogin(role: string) {
    try {
      const response = await loginAPI({
        username: role,
        password: "123456",
      })
      setUser(response)
      navigate("/")
    } catch (error) {
      console.error(error)
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
          body: {
            padding: "40px 36px",
          },
        }}>
        <Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: 32,
            fontWeight: 600,
          }}>
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
            onClick={() => handleLogin("super_admin")}>
            超级管理员登录
          </Button>

          <Button
            size="large"
            block
            onClick={() => handleLogin("tenant_admin")}>
            租户管理员登录
          </Button>

          <Button
            size="large"
            block
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
            <Text type="secondary">请选择角色进行登录</Text>
          )}
        </div>
      </Card>
    </div>
  )
}
