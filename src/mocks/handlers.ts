import { userHandlers } from "./user/user.handlers"
// 以后继续加
// import { productHandlers } from "./product/product.handlers"

export const handlers = [
  ...userHandlers,
  // ...productHandlers,
]
