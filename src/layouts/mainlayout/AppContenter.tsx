import { theme } from "antd"

import { Content } from "antd/es/layout/layout"

import { Outlet } from "react-router-dom"

function AppContenter() {
  // 获取 Ant Design 主题 token
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
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
  )
}

export default AppContenter
