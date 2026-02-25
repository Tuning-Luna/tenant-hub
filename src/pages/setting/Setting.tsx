// pages/Setting.tsx
import { Card, Button, Form, Input, Space, Typography } from "antd"
import Permission from "../../components/Permission"

const { Title } = Typography

export default function Setting() {
  return (
    <div>
      <Title level={3}>系统设置</Title>

      <Card>
        <Form layout="vertical">
          <Form.Item label="系统名称">
            <Input placeholder="请输入系统名称" />
          </Form.Item>

          <Space>
            {/* 保存配置 */}
            <Permission permission="system:config:view">
              <Button type="primary">保存配置</Button>
            </Permission>

            {/* 删除租户（仅 super_admin） */}
            <Permission permission="system:tenant:delete">
              <Button danger>删除当前租户</Button>
            </Permission>
          </Space>
        </Form>
      </Card>
    </div>
  )
}
