/// <reference types="vitest" />

import { resolve } from 'node:path'
import process from 'node:process'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from '@tailwindcss/postcss'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import Optimization from '@uni-ku/bundle-optimizer'
import AutoImportTypes from 'auto-import-types'
import PiniaAutoRefs from 'pinia-auto-refs'
import { UpResolver } from 'uni-ui-plus'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 仅在 mp-* 平台启用 weapp-tailwindcss，其余平台（含未设置）默认禁用
  const platform = process.env.UNI_PLATFORM || 'h5'
  const weappTailwindcssDisabled = !platform.startsWith('mp-')
  // 保持默认 basedir（项目根目录），避免错误指向包目录

  return {
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
      },
    },
    optimizeDeps: {
      exclude: process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'development' ? ['wot-design-uni'] : [],
    },
    plugins: [
      AutoImportTypes(),
      PiniaAutoRefs(),
      UniManifest(),
      /**
       * vite-plugin-uni-pages
       * @see https://github.com/uni-helper/vite-plugin-uni-pages
       */
      UniPages({
        exclude: ['**/components/**/*.*'],
        subPackages: ['src/pages-sub', 'src/sub-packages'],
        dts: './src/@types/uni-pages.d.ts',
      }),

      /**
       * vite-plugin-uni-layouts
       * @see https://github.com/uni-helper/vite-plugin-uni-layouts
       */
      UniLayouts(),

      // 移除 UnoCSS，改用 Tailwind v4（通过 PostCSS）

      /**
       * unplugin-auto-import 按需 import
       * @see https://github.com/antfu/unplugin-auto-import
       */
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          'pinia',
          'vue-i18n',
          {
            '@iceywu/utils': [
              'to',
              'list',
              'sleep',
              'consolePlus',
              'getObjVal',
              'isArray',
              'isEmpty',
              'isObject',
              'isNumber',
              'isString',
              'arrayLast',
              'arrayFirst',
              'deepClone',
              'customDestr',
              'toPro',
            ],
          },
          {
            'vue-hooks-pure': [
              'useRequest',
            ],
          },
        ],
        dts: './src/@types/auto-imports.d.ts',
        dirs: ['./src/composables', './src/api', './src/store', './src/utils/http', './src/hooks'],
        vueTemplate: true,
        // packagePresets: ['@iceywu/utils', 'vue-hooks-pure'],
      }),

      /**
       * unplugin-vue-components 按需引入组件
       * 注意：需注册至 uni 之前，否则不会生效
       * @see https://github.com/antfu/vite-plugin-components
       */
      Components({
        resolvers: [
          UpResolver(),
          WotResolver(),
        ],
        dts: './src/@types/components.d.ts',
      }),

      /**
       * vite-plugin-vue-devtools 增强 Vue 开发者体验
       * @see https://github.com/webfansplz/vite-plugin-vue-devtools
       */
      VueDevTools(),

      uni(),

      // 仅针对小程序端启用，需放在 uni() 之后以处理产物
      ...(weappTailwindcssDisabled
        ? []
        : [
            uvwt({
              rem2rpx: true,
              appType: 'uni-app-vite',
            }),
          ]),

      Optimization({
        enable: {
          'optimization': true,
          'async-import': true,
          'async-component': true,
        },
        dts: {
          'enable': true,
          'base': 'src/@types',
          // 上面是对类型生成的比较全局的一个配置
          // 下面是对每个类型生成的配置，以下各配置均为可选参数
          'async-import': {
            enable: true,
            base: 'src/@types',
            name: 'async-import.d.ts',
            path: 'src/@types/async-import.d.ts',
          },
          'async-component': {
            enable: true,
            base: 'src/@types',
            name: 'async-component.d.ts',
            path: 'src/@types/async-component.d.ts',
          },
        },
        logger: true,
      }),
    ],

    /**
     * Vitest
     * @see https://github.com/vitest-dev/vitest
     */
    test: {
      environment: 'jsdom',
    },
    css: {
      // 启用 Tailwind v4 的 PostCSS 插件
      postcss: {
        plugins: [
          tailwindcss(),
        ],
      },
      preprocessorOptions: {
        scss: {
        },
      },
    },
  }
})
