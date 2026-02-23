import { loginHandlers } from "./login/login.handlers"
// 以后继续加
// import { productHandlers } from "./product/product.handlers"

export const handlers = [
  ...loginHandlers,
  // ...productHandlers,
]
