## 一、整体技术选型（先定方向，后写代码）

### 前端

- **React 18**
- **TypeScript（必须）**
- **Vite**（启动快，配置干净）
- **React Router v6**（路由 + 权限）
- **状态管理**：

  - 首选 **Zustand**（比 Redux 轻很多，面试官也认可）

- **请求层**：

  - axios
  - mock：**MSW（Mock Service Worker）**

### UI 组件库（重点）

**Ant Design + 自定义封装 = 最适合 SaaS 简历项目**

---

## 二、推荐的实现顺序（非常关键）

不要一上来就写大屏或 UI，顺序错了会返工。

### 正确顺序 👇

1. **项目初始化 + 基础架构**
2. **多租户模型**
3. **登录 & Token**
4. **RBAC 权限系统**
5. **菜单 / 路由权限**
6. **Mock 后端（MSW）**
7. **数据大屏**
8. **交互增强（搜索 / 快捷键 / 主题）**

---

## 三、核心功能逐一拆解（重点）

---

## 1️⃣ 多租户体系（SaaS 灵魂）

### 核心思想

> **所有数据都必须绑定 tenantId（公司 ID）**

### 数据模型（Mock 层就要这样设计）

```ts
User {
  id
  name
  role
  tenantId
}

Tenant {
  tenantId
  name
  logo
  theme
}
```

### 实现步骤

1. 登录返回：

```json
{
  "token": "xxx",
  "tenant": {
    "id": "t_001",
    "name": "Acme Corp",
    "logo": "/logo1.png"
  },
  "user": {
    "role": "manager"
  }
}
```

2. 前端存储：

- Zustand 中存：

  - tenantInfo
  - userInfo

3. 页面表现：

- 左上角显示 **公司 Logo + 公司名**
- 所有请求自动带上：

```ts
headers: {
  "X-Tenant-ID": tenantId
}
```

📌 **简历亮点写法**

> 实现基于 tenantId 的多租户数据隔离，支持不同企业独立品牌与数据空间

---

## 2️⃣ RBAC 权限系统（面试官最爱）

### 权限设计（别用 if 判断角色）

```ts
type Permission = "user:create" | "user:view" | "report:view" | "dashboard:view"
```

```ts
Role = {
  superAdmin: Permission[],
  manager: Permission[],
  staff: Permission[]
}
```

### 实现步骤

1. 登录时返回权限列表
2. Zustand 存 permissions
3. 封装权限判断函数：

```ts
hasPermission("user:create")
```

4. 三层控制：

- 路由级（能不能进）
- 菜单级（显不显示）
- 按钮级（能不能点）

📌 **简历写法**

> 基于 RBAC 模型实现前端细粒度权限控制，覆盖路由、菜单及操作级别

---

## 3️⃣ 路由 + 菜单权限（很容易写得很烂）

### 菜单配置化（关键）

```ts
const routes = [
  {
    path: "/dashboard",
    permission: "dashboard:view",
    element: <Dashboard />,
  },
]
```

### 实现步骤

1. 登录后生成 **可访问路由表**
2. 动态渲染 Menu
3. Router 中只注册有权限的路由

📌 这一步能体现你不是“写死菜单的菜鸟”

---

## 4️⃣ Mock 后端（一定要专业）

### 为什么选 MSW

- 真正拦截 fetch / axios
- 不污染业务代码
- 和真实后端切换零成本

### 实现步骤

1. 定义 API：

```ts
POST / login
GET / users
GET / reports
```

2. Mock 数据根据：

- tenantId
- role
- permission

动态返回不同结果

📌 简历加分点：

> 使用 MSW 构建可切换的 Mock API 层，支持多租户与权限模拟

---

## 5️⃣ 数据大屏 / 报表（门面）

### 技术选型

- **ECharts（必选）**
- Ant Design Pro 的 Statistic / Card

### 实现建议

- KPI 卡片（今日 / 本月）
- 折线图（趋势）
- 柱状图（对比）
- 表格（明细）

📌 不追求炫，追求**“像真实 SaaS”**

---

## 6️⃣ 交互细节（高级感来源）

### 全局搜索

- Cmd + K 打开
- 搜菜单 / 页面

### 快捷键

- react-hotkeys-hook
- Esc 关闭 Modal
- Cmd + / 打开帮助

### 换肤 / 暗黑模式

- Ant Design Theme Token
- Zustand 存 theme
- CSS Variables

📌 这些是 **“简历里让人眼前一亮的东西”**

---

## 四、组件库最终推荐

### 结论版

- **Ant Design（主）**
- **Tailwind（补）**
- **ECharts**
- **MSW**

如果你愿意，我可以下一步直接帮你：

- 给你一个 **项目目录结构（企业级）**
- 写一段 **“简历用项目描述”**
- 或直接 **帮你设计 RBAC 权限表**

你下一步想从哪一块开始落地？
