import { Button, Card, Space, Typography, Descriptions, theme } from "antd"
import { loginAPI } from "../../api/login"
const { Title } = Typography
import { useAuthStore } from "../../stores/useAuthStore"
import { Navigate, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const isLogin = useAuthStore((s) => s.isLogin)
  if (isLogin) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  const navigate = useNavigate()
  const { setUser } = useAuthStore.getState()
  const user = useAuthStore((state) => state.user)
  const { resetUser } = useAuthStore.getState()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

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
        background: "#141414",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Card
        style={{
          width: 500,
          background: colorBgContainer,
        }}>
        <Title
          level={3}
          style={{ textAlign: "center", marginBottom: 30 }}>
          权限测试登录
        </Title>

        <Space
          orientation="vertical"
          size="middle"
          style={{ width: "100%" }}>
          <Button
            type="primary"
            block
            onClick={() => handleLogin("super_admin")}>
            超级管理员登录
          </Button>

          <Button
            type="default"
            block
            onClick={() => handleLogin("tenant_admin")}>
            租户管理员登录
          </Button>

          <Button
            danger
            block
            onClick={() => handleLogin("staff")}>
            普通员工登录
          </Button>
          <Button
            type="link"
            block
            onClick={() => resetUser()}>
            退出登录
          </Button>
        </Space>

        <div style={{ marginTop: 40 }}>
          {user ? (
            <Descriptions
              title="登录信息"
              bordered
              column={1}
              size="small">
              <Descriptions.Item label="Token">{user.token}</Descriptions.Item>
              <Descriptions.Item label="用户名">
                {user.user.username}
              </Descriptions.Item>
              <Descriptions.Item label="角色">
                {user.user.role}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Typography.Text type="secondary">请先登录</Typography.Text>
          )}
        </div>
      </Card>
    </div>
  )
}
