1. 安装必要的包：
   antd @ant-design/icons zustand react-router-dom axios msw

2. 在 src 下配置好了对应的文件夹

src/
├─ api/ # axios 请求封装 & Mock
├─ assets/ # logo、图片等资源
├─ components/ # 公共组件（Button、Table、SearchBar）
├─ config/ # 路由表、权限配置、常量
├─ hooks/ # 自定义 Hook（useAuth, useTenant）
├─ layouts/ # 公共布局（Header, Sidebar, Layout）
├─ pages/ # 页面目录（Dashboard, Users, Reports）
├─ stores/ # Zustand 状态管理
├─ themes/ # 暗黑/浅色主题切换
├─ utils/ # 工具函数
├─ App.tsx
└─ main.tsx

3. 配置好了 msw 模拟请求，测试通过,

4. zustand 状态管理，测试通过

5. 配置好了 router，搭建起了 MainLayout
