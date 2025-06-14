import { createI18n } from 'vue-i18n'
import en from '../locale/en.json'
import zh from '../locale/zh.json'

// const defaultLang = uni.getStorageSync("lang") || "zh"
const defaultLang = uni.getLocale() || 'zh'

const i18n = createI18n({
  locale: defaultLang || 'zh',
  messages: {
    en,
    zh,
  },
  fallbackLocale: 'en', // 回退语言
  legacy: false,
})
export default i18n
