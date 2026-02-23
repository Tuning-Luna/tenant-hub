import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Result, Button } from "antd"

interface Props {
  status: "403" | "404" | "500"
  title: string
  subTitle: string
}

export default function ResultPage({ status, title, subTitle }: Props) {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    // 倒计时逻辑
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate("/", { replace: true }) // 5秒后跳转
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // 组件卸载时清除定时器，防止内存泄漏
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div style={{ marginTop: "100px" }}>
      <Result
        status={status}
        title={title}
        subTitle={`${subTitle} 系统将在 ${seconds} 秒后自动跳转到首页。`}
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/", { replace: true })}>
            立即返回首页
          </Button>
        }
      />
    </div>
  )
}
