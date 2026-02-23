import { http, HttpResponse } from "msw"
import type { ApiResponse } from "../../utils/request"
import type { UserT } from "../../types/user"
import {
  mockSuperAdminUser,
  mockTenantAdminUser,
  mockStaffUser,
} from "./login.mock"

export const loginHandlers = [
  // 注意这里改为 async 函数
  http.post("/login", async ({ request }) => {
    // 1. 使用 request.json() 获取异步解析的 Body 数据
    const { username, password } = (await request.json()) as {
      username: string
      password: string
    }

    // 2. 逻辑判断
    if (username === "super_admin" && password === "123456") {
      return HttpResponse.json<ApiResponse<UserT>>({
        code: 200,
        message: "success",
        data: mockSuperAdminUser,
      })
    }
    if (username === "tenant_admin" && password === "123456") {
      return HttpResponse.json<ApiResponse<UserT>>({
        code: 200,
        message: "success",
        data: mockTenantAdminUser,
      })
    }
    if (username === "staff" && password === "123456") {
      return HttpResponse.json<ApiResponse<UserT>>({
        code: 200,
        message: "success",
        data: mockStaffUser,
      })
    }
  }),
]
