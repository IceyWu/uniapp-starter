// URL 映射配置
export const pagesMap = [
  { name: 'index', path: '/pages/index' },
  { name: 'hi', path: '/pages/hi' },
  { name: 'webview', path: '/pages/webview' },
  { name: 'home-detail', path: '/pages/home/detail' },
  { name: 'mine-index', path: '/pages/mine/index' },
  { name: 'post-index', path: '/pages/post/index' },
  { name: 'qr-auth', path: '/pages/qr/qrAuth' },
] as const

export const h5HsqMap: readonly string[] = [
  // H5 环境下需要特殊处理的路由名称列表，例如：
  // 'topic', 'activity',
] as const

export const needAuthPath = ['/pages/mine/index', '/pages/post/index'] as const

export function getUrlType(url: string): 'page' | 'tabBar' | 'other' {
  // 判断 URL 类型的逻辑
  if (url.startsWith('/pages/')) {
    return 'page'
  }
  if (url.includes('tabBar')) {
    return 'tabBar'
  }
  return 'other'
}

export type PageItem = (typeof pagesMap)[number]
