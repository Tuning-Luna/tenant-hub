// pages/UserList.tsx
import { Table, Button, Space, Card, Typography, Popconfirm } from "antd"
import Permission from "../../components/Permission"

const { Title } = Typography

export default function UserList() {
  const data = [
    {
      key: 1,
      name: "张三",
      role: "普通员工",
    },
  ]

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "角色",
      dataIndex: "role",
    },
    {
      title: "操作",
      render: () => (
        <Space>
          {/* 编辑 */}
          <Permission permission="tenant:user:edit">
            <Button type="link">编辑</Button>
          </Permission>

          {/* 分配角色 */}
          <Permission permission="tenant:role:assign">
            <Button type="link">分配角色</Button>
          </Permission>

          {/* 删除 */}
          <Permission permission="tenant:user:delete">
            <Popconfirm title="确认删除？">
              <Button
                type="link"
                danger>
                删除
              </Button>
            </Popconfirm>
          </Permission>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={3}>用户列表</Title>

      <Card
        extra={
          <Permission permission="tenant:user:add">
            <Button type="primary">新增用户</Button>
          </Permission>
        }>
        <Table
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  )
}
