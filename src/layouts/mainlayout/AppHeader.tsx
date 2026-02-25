import { Layout, theme } from "antd"
import { useNavigate } from "react-router-dom"
const { Header } = Layout
import { useAuthStore } from "../../stores/useAuthStore"
function AppHeader() {
  const navigate = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  function handleLogout() {
    useAuthStore.getState().resetUser()
    navigate("/login")
  }

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div onClick={handleLogout}>退出登录</div>
    </Header>
  )
}

export default AppHeader
