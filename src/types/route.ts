export interface RouteConfig {
  path: string
  title: string
  icon?: React.ReactNode
  element?: React.ReactNode
  permission?: string
  children?: RouteConfig[]
  hidden?: boolean
}
