// pages/Analysis.tsx
import { Card, Button, Space, Table, Typography } from "antd"
import Permission from "../../components/Permission"

const { Title } = Typography

export default function Analysis() {
  const columns = [
    { title: "日期", dataIndex: "date" },
    { title: "访问量", dataIndex: "views" },
  ]

  const data = [
    { key: 1, date: "2026-02-01", views: 1200 },
    { key: 2, date: "2026-02-02", views: 1500 },
  ]

  return (
    <div>
      <Title level={3}>数据分析</Title>

      <Card
        extra={
          <Space>
            <Permission permission="tenant:data:export">
              <Button type="primary">导出报表</Button>
            </Permission>
          </Space>
        }>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Card>
    </div>
  )
}
