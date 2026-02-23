import { request } from "../utils/request"
import type { UserT } from "../types/user"

export function loginAPI({
  username,
  password,
}: {
  username: string
  password: string
}) {
  return request<UserT>({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
    },
  })
}
