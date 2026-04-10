import React, { useMemo } from "react"
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Space,
  Tag,
  Divider,
} from "antd"
import {
  ArrowUpOutlined,
  DotChartOutlined,
  ThunderboltOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import { useAuthStore } from "../../stores/useAuthStore"

const { Title, Text } = Typography

// 亮色大屏特有样式
const LIGHT_GRADIENT = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
const GLASS_CARD = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
}

export default function LightModeBigScreen() {
  const themeColor = useAuthStore((s) => s.user?.tenant.themeColor || "#1677ff")

  // --- 高亮面积折线图 ---
  const lineOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "#fff",
        textStyle: { color: "#333" },
        extraCssText:
          "box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px;",
      },
      grid: {
        top: "10%",
        left: "3%",
        right: "3%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLine: { lineStyle: { color: "#ddd" } },
        axisLabel: { color: "#999" },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "#eee", type: "dashed" } },
      },
      series: [
        {
          type: "line",
          smooth: true,
          lineStyle: { width: 4, color: themeColor },
          symbol: "circle",
          symbolSize: 10,
          itemStyle: { color: themeColor, borderWidth: 3, borderColor: "#fff" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${themeColor}44` },
              { offset: 1, color: `${themeColor}00` },
            ]),
          },
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    }),
    [themeColor]
  )

  // --- 渐变圆角柱状图 ---
  const barOption = useMemo(
    () => ({
      grid: {
        top: "5%",
        left: "0%",
        right: "0%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["A", "B", "C", "D", "E"],
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          barWidth: "35%",
          itemStyle: {
            borderRadius: [20, 20, 20, 20],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: themeColor },
              { offset: 1, color: `${themeColor}66` },
            ]),
          },
          data: [45, 78, 56, 92, 63],
        },
      ],
    }),
    [themeColor]
  )

  return (
    <div
      style={{
        background: LIGHT_GRADIENT,
        minHeight: "100vh",
        padding: "32px",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}>
      {/* 顶部标题栏：通过阴影产生悬浮感 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          padding: "16px 24px",
          ...GLASS_CARD,
        }}>
        <Space size="middle">
          <div
            style={{
              width: 40,
              height: 40,
              background: themeColor,
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 4px 12px ${themeColor}66`,
            }}>
            <ThunderboltOutlined style={{ color: "#fff", fontSize: 20 }} />
          </div>
          <Title
            level={3}
            style={{ margin: 0, letterSpacing: -1 }}>
            Tenant Intelligence Hub
          </Title>
        </Space>
        <Space size="large">
          <Statistic
            title="System Status"
            value="Healthy"
            valueStyle={{ color: "#52c41a", fontSize: 16, fontWeight: "bold" }}
          />
          <Divider type="vertical" />
          <Text strong>{new Date().toLocaleDateString()}</Text>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {/* 指标卡片行 */}
        <Col span={16}>
          <Row gutter={[24, 24]}>
            {[
              {
                title: "总用户数",
                value: "24,592",
                icon: <TeamOutlined />,
                color: themeColor,
              },
              {
                title: "实时请求",
                value: "1,842",
                icon: <DotChartOutlined />,
                color: "#722ed1",
              },
            ].map((item, idx) => (
              <Col
                span={12}
                key={idx}>
                <Card style={GLASS_CARD}>
                  <Statistic
                    title={<Text type="secondary">{item.title}</Text>}
                    value={item.value}
                    prefix={item.icon}
                    valueStyle={{
                      color: item.color,
                      fontWeight: 800,
                      fontSize: 32,
                    }}
                  />
                  <div style={{ marginTop: 12 }}>
                    <Tag
                      color="success"
                      icon={<ArrowUpOutlined />}>
                      12.5%
                    </Tag>
                    <Text type="secondary">较昨日同期有所增长</Text>
                  </div>
                </Card>
              </Col>
            ))}

            {/* 主图表卡片 */}
            <Col span={24}>
              <Card
                title="业务增长流量趋势"
                style={GLASS_CARD}>
                <ReactECharts
                  option={lineOption}
                  style={{ height: 400 }}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* 右侧侧边栏 */}
        <Col span={8}>
          <Space
            direction="vertical"
            size={24}
            style={{ width: "100%" }}>
            <Card
              title="租户资源分配"
              style={GLASS_CARD}>
              <ReactECharts
                option={barOption}
                style={{ height: 200 }}
              />
              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}>
                  <Text>存储空间</Text>
                  <Text strong>82%</Text>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#eee",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}>
                  <div
                    style={{
                      width: "82%",
                      height: "100%",
                      background: themeColor,
                    }}
                  />
                </div>
              </div>
            </Card>

            <Card
              title="最新动态"
              style={GLASS_CARD}>
              <Space
                direction="vertical"
                split={<Divider style={{ margin: "8px 0" }} />}
                style={{ width: "100%" }}>
                {[
                  "上海租户完成数据同步",
                  "系统检测到新的活跃峰值",
                  "节点 A5 自动完成扩容",
                ].map((msg, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: themeColor,
                        borderRadius: "50%",
                        marginRight: 12,
                      }}
                    />
                    <Text ellipsis>{msg}</Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  )
}
