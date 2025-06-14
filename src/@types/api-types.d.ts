// API 相关的类型声明

declare namespace GetTest {
  interface params {
    id?: string | number
    page?: number
    limit?: number
  }

  interface data {
    code: number
    message: string
    data: any[]
  }
}

declare namespace PostTest {
  interface params {
    name: string
    description?: string
  }

  interface data {
    code: number
    message: string
    data: {
      id: number
      name: string
      description?: string
    }
  }
}

// 通用 API 响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页相关类型
export interface PaginationParams {
  page?: number
  limit?: number
  keyword?: string
}

export interface PaginationResponse<T> {
  list: T[]
  total: number
  current: number
  pageSize: number
}

// 用户相关类型
export interface UserInfo {
  id: number
  name: string
  avatar?: string
  phone?: string
  email?: string
  createTime?: string
}

export interface LoginParams {
  username: string
  password: string
  code?: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  userInfo: UserInfo
}

// 上传相关类型
export interface UploadResponse {
  url: string
  filename: string
  size: number
}

// Topic 相关类型
export interface TopicItem {
  id: number
  title: string
  content: string
  createTime: string
  updateTime: string
  userId: number
  User?: UserInfo
  TopicTag?: Array<{
    id: number
    name: string
    color?: string
  }>
  fileList?: Array<{
    url: string
    type: string
  }>
}
