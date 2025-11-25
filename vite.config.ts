/// <reference types="vitest" />

import { resolve } from 'node:path'
import Uni from '@uni-helper/plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import Optimization from '@uni-ku/bundle-optimizer'
import AutoImportTypes from 'auto-import-types'
import PiniaAutoRefs from 'pinia-auto-refs'
import { UpResolver } from 'uni-ui-plus'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
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
      dts: 'src/@types/uni-pages.d.ts',
    }),

    /**
     * vite-plugin-uni-layouts
     * @see https://github.com/uni-helper/vite-plugin-uni-layouts
     */
    UniLayouts(),

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
          'vue-hooks-pure': ['useRequest'],
        },
      ],
      dts: 'src/@types/auto-imports.d.ts',
      dirs: [
        './src/composables',
        './src/api',
        './src/store',
        './src/utils/http',
        './src/hooks',
      ],
      vueTemplate: true,
      // packagePresets: ['@iceywu/utils', 'vue-hooks-pure'],
    }),

    /**
     * unplugin-vue-components 按需引入组件
     * 注意：需注册至 uni 之前，否则不会生效
     * @see https://github.com/antfu/vite-plugin-components
     */
    Components({
      resolvers: [WotResolver(), UpResolver()],
      dts: 'src/@types/components.d.ts',
    }),

    UniPolyfill(),

    Optimization({
      enable: {
        optimization: true,
        'async-import': true,
        'async-component': true,
      },
      dts: {
        enable: true,
        base: 'src/@types',
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
      logger: false,
    }),
    Uni(),
    UnoCSS(),
  ],

  /**
   * Vitest
   * @see https://github.com/vitest-dev/vitest
   */
  test: {
    environment: 'jsdom',
  },
})
