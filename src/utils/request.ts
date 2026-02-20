// src/utils/request.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios"

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: unknown) => Promise.reject(error)
)

service.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => {
    const res = response.data

    if (res.code !== 200) {
      if (res.code === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }

      return Promise.reject(new Error(res.message))
    }

    return res.data
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      // const status = error.response?.status
    }

    return Promise.reject(error)
  }
)

export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return service(config) as Promise<T>
}
