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

  // 倒计时递减
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 单独监听 seconds
  useEffect(() => {
    if (seconds <= 0) {
      navigate("/", { replace: true })
    }
  }, [seconds, navigate])

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
