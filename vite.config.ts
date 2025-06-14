/// <reference types="vitest" />

import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImportTypes from 'auto-import-types'
import PiniaAutoRefs from 'pinia-auto-refs'
import { UpResolver } from 'uni-ui-plus'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  /**
   * 为兼容 @dcloudio/vite-plugin-uni 采用 CJS ，而 UnoCSS 只支持 ESM
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const Unocss = await import('unocss/vite').then(i => i.default)

  return {
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
        subPackages: ['src/pages-sub'],
        dts: './src/@types/uni-pages.d.ts',
      }),

      /**
       * vite-plugin-uni-layouts
       * @see https://github.com/uni-helper/vite-plugin-uni-layouts
       */
      UniLayouts(),

      /**
       * unocss
       * @see https://github.com/antfu/unocss
       * see unocss.config.ts for config
       */
      Unocss(),

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
        resolvers: [UpResolver()],
        dts: './src/@types/components.d.ts',
      }),

      /**
       * vite-plugin-vue-devtools 增强 Vue 开发者体验
       * @see https://github.com/webfansplz/vite-plugin-vue-devtools
       */
      VueDevTools(),

      uni(),
    ],

    /**
     * Vitest
     * @see https://github.com/vitest-dev/vitest
     */
    test: {
      environment: 'jsdom',
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'color-functions'],
        },
      },
    },
    transpileDependencies: ['@dcloudio/uni-ui'],
  }
})
