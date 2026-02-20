import { request } from "../utils/request"

import type { UserT } from "../types/user"

export function getTestAPI() {
  return request<UserT>({
    url: "/user",
    method: "get",
  })
}
