import type { ThemeColors } from './theme'

export interface ThemePreset {
  colors: ThemeColors
  name: string
}

export const themePresets: ThemePreset[] = [
  {
    name: '默认蓝',
    colors: {
      primary: '#1C64FD',
      success: '#12B886',
      warning: '#F57F00',
      danger: '#F14646',
      info: '#868A9C',
    },
  },
  {
    name: '水墨',
    colors: {
      primary: '#B0B0B0',
      success: '#8FAF92',
      warning: '#C9A96E',
      danger: '#C06060',
      info: '#9E9E9E',
    },
  },
  {
    name: '薄暮橙',
    colors: {
      primary: '#F77234',
      success: '#00B42A',
      warning: '#FAAD14',
      danger: '#E62C3B',
      info: '#8590A6',
    },
  },
  {
    name: '日暮黄',
    colors: {
      primary: '#F7BA1E',
      success: '#52C41A',
      warning: '#FA8C16',
      danger: '#F5222D',
      info: '#8C8C8C',
    },
  },
  {
    name: '明青',
    colors: {
      primary: '#14C9C9',
      success: '#00B42A',
      warning: '#FF7D00',
      danger: '#F53F3F',
      info: '#86909C',
    },
  },
  {
    name: '极光绿',
    colors: {
      primary: '#12B886',
      success: '#52C41A',
      warning: '#FAAD14',
      danger: '#F5222D',
      info: '#8C8C8C',
    },
  },
  {
    name: '酱紫',
    colors: {
      primary: '#722ED1',
      success: '#13C2C2',
      warning: '#FAAD14',
      danger: '#F5222D',
      info: '#8C8C8C',
    },
  },
  {
    name: '品红',
    colors: {
      primary: '#D91AD9',
      success: '#13C2C2',
      warning: '#FA8C16',
      danger: '#F5222D',
      info: '#8C8C8C',
    },
  },
]
