import { useState } from "react"
import {
  Layout,
  theme,
  Avatar,
  Dropdown,
  Space,
  Modal,
  Descriptions,
  Tag,
  Divider,
} from "antd"
import type { MenuProps } from "antd"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/useAuthStore"

const { Header } = Layout

function AppHeader() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const resetUser = useAuthStore((state) => state.resetUser)
  const user = useAuthStore((state) => state.user)

  function handleLogout() {
    resetUser()
    navigate("/login")
  }

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "个人信息",
      icon: <UserOutlined />,
      onClick: () => setOpen(true),
    },
    { type: "divider" },
    {
      key: "logout",
      label: "退出登录",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ]

  return (
    <>
      <Header
        style={{
          padding: "0 24px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* 左侧系统名 */}
        <div style={{ fontSize: 16, fontWeight: 500 }}>
          {user?.tenant.name || "Luna Admin System"}
        </div>

        {/* 右侧用户区 */}
        <Dropdown
          menu={{ items }}
          placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              src={user?.tenant.logo}
              icon={<UserOutlined />}
            />
            <span>{user?.user.username || "未登录用户"}</span>
          </Space>
        </Dropdown>
      </Header>

      {/* 个人信息弹窗 */}
      <Modal
        title="个人信息"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}>
        {user && (
          <>
            <Descriptions
              column={1}
              bordered
              size="small">
              <Descriptions.Item label="用户ID">
                {user.user.id}
              </Descriptions.Item>

              <Descriptions.Item label="用户名">
                {user.user.username}
              </Descriptions.Item>

              <Descriptions.Item label="角色">
                <Tag color="blue">{user.user.role}</Tag>
              </Descriptions.Item>

              <Descriptions.Item label="租户">
                {user.tenant.name}
              </Descriptions.Item>

              <Descriptions.Item label="是否试用">
                {user.tenant.isTrial ? (
                  <Tag color="orange">试用中</Tag>
                ) : (
                  <Tag color="green">正式版</Tag>
                )}
              </Descriptions.Item>

              <Descriptions.Item label="权限数量">
                {user.permissions.length}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
              <b>权限列表：</b>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 12px",
                }}>
                {user.permissions.map((p) => (
                  <Tag key={p}>{p}</Tag>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default AppHeader
