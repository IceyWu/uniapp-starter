import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { APP_NAME } from './src/config/app'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [],
  globalStyle: {
    navigationBarTitleText: APP_NAME,
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    'app-plus': {
      titleNView: false, // 移除 H5、APP 顶部导航
      bounce: 'none',
    },
    navigationStyle: 'custom',
    enablePullDownRefresh: false,
    disableScroll: true,
  },
  tabBar: {
    custom: true,
    color: '#86909c',
    selectedColor: '#165DFF',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'static/tabbar/placeholder.png',
        selectedIconPath: 'static/tabbar/placeholder.png',
        text: '首页',
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: 'static/tabbar/placeholder.png',
        selectedIconPath: 'static/tabbar/placeholder.png',
        text: '我的',
      },
    ],
  },
})
