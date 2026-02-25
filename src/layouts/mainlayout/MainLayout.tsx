import { Layout } from "antd"

import AppSider from "./AppSider"
import AppHeader from "./AppHeader"
import AppContenter from "./AppContenter"

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 侧边菜单栏 */}
      <AppSider />

      <Layout>
        {/* 头部区域 */}
        <AppHeader />

        {/* 内容区域 */}
        <AppContenter />
      </Layout>
    </Layout>
  )
}

export default MainLayout
