/**
 * 主题配置 - 基于 wot-design-uni
 * 文档: https://wot-design-uni.netlify.app/component/config-provider.html
 */
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { ref } from 'vue'

// 主题变量类型
const themeVars = ref<ConfigProviderThemeVars>()

/**
 * 使用主题配置
 * @param vars 自定义主题变量
 * @returns 主题变量和更新方法
 */
export function useTheme(vars?: ConfigProviderThemeVars) {
  if (vars) {
    themeVars.value = vars
  }

  /**
   * 更新主题变量
   * @param newVars 新的主题变量
   */
  function updateThemeVars(newVars: ConfigProviderThemeVars) {
    themeVars.value = { ...themeVars.value, ...newVars }
  }

  return {
    themeVars,
    updateThemeVars,
  }
}

/**
 * 默认主题变量示例
 * 可以根据需要自定义主题色
 */
export const defaultThemeVars: ConfigProviderThemeVars = {
  // 主题色示例
  // colorTheme: '#4D80F0',
  // 成功色
  // colorSuccess: '#34d19d',
  // 警告色
  // colorWarning: '#f0883a',
  // 危险色
  // colorDanger: '#fa4350',

  // 按钮相关
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#ffffff',

  // 更多变量请参考: https://wot-design-uni.netlify.app/guide/custom-theme.html
}
