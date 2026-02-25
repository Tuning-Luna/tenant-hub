// pages/Dashboard.tsx
import { Card, Row, Col, Typography, Button, Space } from "antd"
import ReactECharts from "echarts-for-react"
import { useMemo } from "react"
import Permission from "../../components/Permission"
import { useAuthStore } from "../..//stores/useAuthStore"

const { Title } = Typography

export default function Dashboard() {
  const themeColor = useAuthStore((s) => s.user?.tenant.themeColor || "#1677ff")

  // 折线图
  const lineOption = useMemo(
    () => ({
      color: [themeColor],
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "line",
          smooth: true,
          areaStyle: {},
        },
      ],
    }),
    [themeColor]
  )

  // 柱状图
  const barOption = useMemo(
    () => ({
      color: [themeColor],
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月"],
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [5, 8, 12, 18, 25],
          type: "bar",
        },
      ],
    }),
    [themeColor]
  )

  return (
    <div>
      <Title level={3}>控制台</Title>

      {/* ===== KPI 卡片 ===== */}
      <Row
        gutter={16}
        style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Title level={4}>租户总数</Title>
            <Title level={2}>128</Title>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Title level={4}>用户总数</Title>
            <Title level={2}>3,892</Title>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Title level={4}>今日访问</Title>
            <Title level={2}>1,209</Title>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Title level={4}>导出次数</Title>
            <Title level={2}>89</Title>
          </Card>
        </Col>
      </Row>

      {/* ===== 按钮级权限控制区域 ===== */}
      <Card style={{ marginBottom: 16 }}>
        <Space>
          {/* tenant:data:export */}
          <Permission permission="tenant:data:export">
            <Button type="primary">导出数据</Button>
          </Permission>

          {/* system:tenant:add */}
          <Permission permission="system:tenant:add">
            <Button type="dashed">新增租户</Button>
          </Permission>
        </Space>
      </Card>

      {/* ===== 图表区域 ===== */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="访问趋势">
            <ReactECharts
              option={lineOption}
              style={{ height: 300 }}
              notMerge
              lazyUpdate
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="租户增长">
            <ReactECharts
              option={barOption}
              style={{ height: 300 }}
              notMerge
              lazyUpdate
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
