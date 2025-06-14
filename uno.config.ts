import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    // 由 Iconify 提供支持的纯 CSS 图标解决方案
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    /**
     * unocss uni-app 小程序预设
     * @see https://github.com/uni-helper/unocss-preset-uni
     */
    presetUni({
      remRpx: false,
      uno: {
        dark: 'class',
      },
      attributify: {
        prefixedOnly: true,
      },
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['center', 'flex justify-center items-center'],

    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none',
    ],
    // [/^bg-(.*)$/, ([, c], { theme }) => {
    //   if (Object.keys(theme.colors).includes(c))
    //     return `bg-${c}`
    // }],
    // 配置bg-btn-
    // [/^bg-btn-(.*)$/, ({ theme }) => {
    //   return Object.keys(theme.colors.btn).map(c => `bg-btn-${c}`)
    // }],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-btn-primary text-white cursor-pointer hover:bg-btn-primaryOne disabled:cursor-default disabled:bg-btn-primaryTwo disabled:opacity-50',
    ],
    ['switch-animation', 'transition duration-300'],
    ['bg-base', 'bg-[#f0f0f0]  switch-animation'],
    ['card-base', 'bg-[#ffffff] dark:bg-gray-800 switch-animation'],
    ['text-base', 'text-[#000]  dark:text-[#fff]'],
    ['text-secondary', 'text-secondary  switch-animation'],
    ['text-active', 'text-primary  switch-animation'],

  ],
  theme: {
    colors: {
      primary: '#EB3477',
      secondary: '#03a9f4',
      success: '#4caf50',
      info: '#2196f3',
      warning: '#ff9800',
      error: '#f44336',
      btn: {
        primary: '#5EDFD6',
        primaryOne: '#89E9E0',
        primaryTwo: '#89E9E0',
        secondary: '#03a9f4',
        success: '#4caf50',
        info: '#2196f3',
        warning: '#ff9800',
        error: '#f44336',
      },
    },

    fontFamily: {
      sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      mono: ['"Courier New"', 'monospace'],
    },
  },
  transformers: [
    transformerDirectives(), // 启用 @apply 功能
    transformerVariantGroup(), // 启用 () 分组功能
  ],
})
