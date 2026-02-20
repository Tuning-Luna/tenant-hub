import { http, HttpResponse } from "msw"
import type { ApiResponse } from "../../utils/request"
import type { UserT } from "../../types/user"
import { mockUser } from "./user.mock"

export const userHandlers = [
  http.get("/user", () => {
    return HttpResponse.json<ApiResponse<UserT>>({
      code: 200,
      message: "success",
      data: mockUser,
    })
  }),
]
