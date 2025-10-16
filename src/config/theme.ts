/**
 * 主题色配置
 */

export interface ThemeColors {
  primary: string
  success: string
  warning: string
  danger: string
  info: string
}

/**
 * 默认主题色配置
 */
export const defaultThemeColors: ThemeColors = {
  primary: '#4D80F0',
  success: '#34d19d',
  warning: '#f0883a',
  danger: '#fa4350',
  info: '#909399',
}

/**
 * 模拟从服务端获取主题色配置
 */
export async function fetchThemeColors(): Promise<ThemeColors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟服务端返回的主题色
      // resolve({
      //   primary: '#07c160',
      //   success: '#52c41a',
      //   warning: '#faad14',
      //   danger: '#f5222d',
      //   info: '#1890ff',
      // })

      // 返回 null 表示使用默认配置
      resolve(null)
    }, 300)
  })
}
