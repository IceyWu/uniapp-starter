# UniApp Starter Template

<!-- markdownlint-disable MD033 MD040 -->
<h5 align='center'>
<b>🚀 现代化的 UniApp 开发模板</b>
</h5>

<br/>

<p align='center'>
<b>简体中文</b> | <a href="./README.en-US.md">English</a>
</p>

<br/>

<p align='center'>
<a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue"></a>
<a href="https://github.com/microsoft/TypeScript"><img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"></a>
<a href="https://unocss.dev/"><img src="https://img.shields.io/badge/UnoCSS-0.66.4-1896FF?style=flat-square&logo=unocss&logoColor=white" alt="UnoCSS"></a>
<a href="https://pinia.vuejs.org/"><img src="https://img.shields.io/badge/Pinia-3.0.3-yellow?style=flat-square&logo=vue.js&logoColor=white" alt="Pinia"></a>
</p>

<br/>

<p align='center'>
<a href="https://uniapp-starter.netlify.app">📱 在线预览</a>
</p>

<br/>

一个功能完备、开箱即用的 UniApp 开发模板,集成了现代化的开发工具链和最佳实践。支持全平台部署,提供卓越的开发体验。

> 🎯 **致力于提供最优雅的 UniApp 开发体验**

## ✨ 特性

### 🔧 开发体验

- ⚡️ [Vue 3](https://github.com/vuejs/core) + [Vite](https://github.com/vitejs/vite) + [TypeScript](https://www.typescriptlang.org/) - 现代化开发栈
- 🗂 [约定式路由](./src/pages) - 基于文件系统的自动路由生成，支持子包和嵌套路由
- 📦 [组件自动导入](./src/components) - 无需手动引入，支持第三方组件库
- 📑 [布局系统](./src/layouts) - 灵活的页面布局管理，支持多种布局模式
- 🔥 [`<script setup>`](https://github.com/vuejs/rfcs/pull/227) - 使用最新的 Vue 3 Composition API 语法
- 📥 [API 自动导入](./src/composables) - Composition API、工具函数等开箱即用
- 🛠 [Vite 插件生态](https://vitejs.dev/plugins/) - 丰富的插件支持，极速的热更新体验

### 🎨 样式与UI

- 🎨 [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎，灵活构建现代界面
- 😃 [Iconify](https://iconify.design) - 海量图标库支持，包含数十万个图标
- 🌙 **暗色模式** - 内置主题切换功能，支持跟随系统设置
- 📱 **响应式设计** - 完美适配各种屏幕尺寸和设备
- 💎 **现代 UI 组件** - 内置常用组件，支持自定义扩展
- 🎭 **主题定制** - 支持主题色彩配置和深度定制

### 🛠 工程化

- 🍍 [Pinia](https://pinia.vuejs.org) - Vue 3 官方推荐的状态管理解决方案
- 🌐 [Vue I18n](https://vue-i18n.intlify.dev/) - 完整的国际化解决方案
- 🔐 **HTTP 客户端** - 基于 Axios 的请求封装，支持拦截器和自动重试
- 📊 **数据持久化** - Pinia 状态持久化，支持多种存储方式
- ✅ [Vitest](https://vitest.dev/) - 现代化单元测试框架，与 Vite 深度集成
- 🔍 [ESLint](https://eslint.org/) - 代码规范检查，配置 UniApp 专用规则
- 🔒 **Git Hooks** - 提交前代码检查，确保代码质量
- 📦 **依赖管理** - 支持 Bun/pnpm，更快的包管理体验

### 📱 全平台支持

- 📱 **App** (Android/iOS) - 使用 uni-app 编译为原生应用
- 🌐 **H5** - 现代浏览器支持，PWA 就绪
- � **微信小程序** - 完整支持微信小程序特性
- � **支付宝小程序** - 支付宝生态应用开发
- � **百度小程序** - 百度智能小程序支持
- 🎵 **字节跳动小程序** - 抖音、今日头条小程序
- � **QQ 小程序** - QQ 生态应用
- ⚡ **快手小程序** - 快手平台小程序
- � **京东小程序** - 京东购物平台
- � **飞书小程序** - 企业级办公应用
- 🌈 **鸿蒙应用** - 华为鸿蒙系统支持
- 🔥 **小红书小程序** - 新增小红书平台支持

## 🧰 技术栈

### 核心框架

- **Vue 3** - 渐进式 JavaScript 框架
- **UniApp** - 跨平台应用开发框架
- **TypeScript** - JavaScript 的超集，提供类型安全

### 构建工具

- **Vite** - 下一代前端工具链
- **ESBuild** - 极速 JavaScript 打包器
- **Bun** - 现代化 JavaScript 运行时和包管理器

### 状态管理

- **Pinia** - Vue 3 官方推荐的状态管理库
- **pinia-plugin-persistedstate** - Pinia 状态持久化插件
- **pinia-auto-refs** - Pinia 自动引用插件

### 样式方案

- **UnoCSS** - 即时原子化 CSS 引擎
- **Sass** - CSS 预处理器

### 网络请求

- **Axios** - 基于 Promise 的 HTTP 客户端库
- 自定义封装的请求拦截器和响应处理
- 支持请求/响应拦截和自动错误处理
- 自动 Token 管理和刷新机制

### 工具库

- **dayjs** - 轻量级日期处理库
- **js-md5** - MD5 加密库
- **spark-md5** - 文件 MD5 计算
- **qs** - 查询字符串解析和序列化
- **blurhash** - 图片模糊哈希
- **gm-crypto** - 加密工具库

### 开发工具

- **ESLint** - 代码检查工具
- **@uni-helper/eslint-config** - UniApp ESLint 配置
- **Vitest** - 单元测试框架
- **Vue DevTools** - Vue 开发者工具
- **simple-git-hooks** - Git 钩子工具
- **lint-staged** - 提交前代码检查

### 插件系统

- **unplugin-auto-import** - API 自动导入，支持 Vue、Pinia 等
- **unplugin-vue-components** - 组件自动导入和注册
- **@uni-helper/vite-plugin-uni-pages** - 基于文件的路由系统
- **@uni-helper/vite-plugin-uni-layouts** - 页面布局系统
- **@uni-helper/vite-plugin-uni-manifest** - manifest.json 自动生成
- **vite-plugin-vue-devtools** - Vue DevTools Vite 插件

### 类型支持

- **@dcloudio/types** - UniApp 官方类型定义
- **@uni-helper/uni-app-types** - 增强的 UniApp 类型定义
- **auto-import-types** - 自动导入类型生成
- 完整的 TypeScript 类型覆盖和智能提示

## 📁 项目结构

```
uniapp-starter/
├── public/                          # 静态资源目录
│   └── favicon.svg                 # 应用图标
├── src/
│   ├── @types/                     # TypeScript 类型定义
│   │   ├── api-types.d.ts         # API 类型定义
│   │   ├── api.d.ts               # API 接口类型
│   │   ├── auto-imports.d.ts      # 自动导入类型
│   │   ├── components.d.ts        # 组件类型定义
│   │   ├── global.d.ts            # 全局类型定义
│   │   ├── store.d.ts             # Store 类型定义
│   │   └── uni-pages.d.ts         # 页面路由类型
│   ├── api/                        # API 接口封装
│   │   └── apiTest.ts             # 示例 API
│   ├── components/                 # 公共组件
│   │   ├── NavBar/                # 导航栏组件
│   │   │   └── index.vue
│   │   ├── TabBar/                # 标签栏组件
│   │   │   └── index.vue
│   │   ├── TheFooter.vue          # 页脚组件
│   │   └── WaterfallsList.vue     # 瀑布流列表组件
│   ├── composables/               # 组合式函数
│   │   ├── useDark.ts             # 暗色模式
│   │   ├── useLanguage.ts         # 语言切换
│   │   └── useRouter.ts           # 路由工具
│   ├── config/                    # 应用配置
│   │   ├── app.ts                 # 应用基础配置
│   │   └── domain.ts              # API 域名配置
│   ├── helper/                    # 辅助工具
│   │   └── pinia-auto-refs.ts     # Pinia 自动引用
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── usePage.ts             # 页面相关 Hook
│   │   └── useTitle.ts            # 标题管理 Hook
│   ├── layouts/                   # 布局组件
│   │   ├── childPage.vue          # 子页面布局
│   │   ├── default.vue            # 默认布局
│   │   ├── home.vue               # 首页布局
│   │   └── README.md              # 布局使用说明
│   ├── locale/                    # 国际化文件
│   │   ├── en.json                # 英文语言包
│   │   └── zh.json                # 中文语言包
│   ├── pages/                     # 页面组件
│   │   ├── index.vue              # 首页
│   │   ├── webview.vue            # WebView 页面
│   │   ├── home/                  # 首页相关页面
│   │   │   └── detail.vue         # 详情页
│   │   ├── mine/                  # 个人中心
│   │   │   └── index.vue          # 个人中心首页
│   │   └── post/                  # 帖子相关
│   │       └── index.vue          # 帖子列表
│   ├── pages-sub/                 # 子包页面
│   │   └── index.vue              # 子包示例页面
│   ├── static/                    # 静态资源
│   │   └── logo.png               # Logo 图片
│   ├── store/                     # 状态管理
│   │   ├── index.ts               # Store 入口
│   │   └── user.ts                # 用户状态管理
│   ├── styles/                    # 样式文件
│   │   └── main.css               # 主样式文件
│   ├── test/                      # 测试文件
│   │   └── basic.test.ts          # 基础测试
│   ├── utils/                     # 工具函数
│   │   ├── enum.ts                # 枚举定义
│   │   ├── i18n.ts                # 国际化工具
│   │   ├── index.ts               # 工具函数入口
│   │   ├── platform.ts            # 平台判断
│   │   ├── router.ts              # 路由工具
│   │   ├── sessionStorage.ts      # 会话存储
│   │   ├── shared.ts              # 共享工具
│   │   ├── urlMap.ts              # URL 映射
│   │   ├── http/                  # HTTP 请求相关
│   │   │   ├── auth.ts            # 认证相关
│   │   │   ├── index.ts           # HTTP 封装
│   │   │   └── tool.ts            # HTTP 工具
│   │   └── tools/                 # 工具方法
│   │       └── serviceLoading.ts  # 服务加载工具
│   ├── App.vue                    # 根组件
│   ├── env.d.ts                   # 环境类型定义
│   ├── main.ts                    # 应用入口
│   ├── manifest.json              # UniApp 配置文件
│   ├── pages.json                 # 页面配置（自动生成）
│   ├── shime-uni.d.ts             # UniApp 类型补充
│   ├── theme.json                 # 主题配置
│   └── uni.scss                   # UniApp 样式变量
├── auto/                          # 自动化工具
│   └── addPage.ts                 # 自动添加页面脚本
├── docs/                          # 文档目录
│   └── RELEASE.md                 # 发布说明
├── scripts/                       # 脚本文件
│   └── release.js                 # 发布脚本
├── test/                          # 测试配置
│   └── setup.ts                   # 测试设置
├── commitlint.config.js           # 提交信息规范配置
├── eslint.config.mjs              # ESLint 配置
├── manifest.config.ts             # UniApp 清单配置
├── pages.config.ts                # 页面路由配置
├── tsconfig.json                  # TypeScript 配置
├── uno.config.ts                  # UnoCSS 配置
├── vite.config.ts                 # Vite 构建配置
├── vitest.config.ts               # Vitest 测试配置
├── bun.lockb                      # Bun 锁定文件
└── package.json                   # 项目依赖配置
```

## 🚀 快速开始

### 📋 环境要求

- **Node.js** >= 18.0.0
- **Bun** >= 1.0.0 (推荐) 或 **pnpm** >= 8.0.0
- **Git** >= 2.0.0

> 💡 推荐使用 [Bun](https://bun.sh/) 作为包管理器，它比 npm/yarn 更快更现代化

### ⚡ 安装

#### 方式一：使用模板创建（推荐）

```bash
# 使用 Bun 创建项目
bunx degit your-org/uniapp-starter my-uniapp-project

# 进入项目目录
cd my-uniapp-project

# 安装依赖
bun install
```

#### 方式二：克隆仓库

```bash
# 克隆仓库
git clone https://github.com/your-org/uniapp-starter.git my-uniapp-project

# 进入项目目录
cd my-uniapp-project

# 安装依赖
bun install
# 或使用 pnpm
pnpm install
```

### 🔄 同步主仓库代码

如需同步主仓库最新模板代码，可执行：

```bash
pnpm syn_rpo
# 或
npm run syn_rpo
```

该命令会自动拉取 <https://github.com/IceyWu/uniapp-starter.git> main 分支的最新内容。

### 🛠 开发

#### H5 开发

```bash
# 启动 H5 开发服务器
bun dev
# 或
bun dev:h5

# 带 SSR 的 H5 开发
bun dev:h5:ssr
```

浏览器自动打开 `http://localhost:5173`

#### 小程序开发

```bash
# 微信小程序
bun dev:mp-weixin

# 支付宝小程序
bun dev:mp-alipay

# 百度小程序
bun dev:mp-baidu

# 字节跳动小程序
bun dev:mp-toutiao

# QQ 小程序
bun dev:mp-qq

# 快手小程序
bun dev:mp-kuaishou

# 京东小程序
bun dev:mp-jd

# 飞书小程序
bun dev:mp-lark
```

#### App 开发

```bash
# App 开发
bun dev:app

# Android 专用
bun dev:app-android

# iOS 专用
bun dev:app-ios
```

#### 快应用开发

```bash
# 快应用-联盟
bun dev:quickapp-webview-union

# 快应用-华为
bun dev:quickapp-webview-huawei
```

### 📦 构建

#### 生产构建

```bash
# H5 构建
bun build:h5

# H5 SSR 构建
bun build:h5:ssr

# 微信小程序构建
bun build:mp-weixin

# App 构建
bun build:app

# 自定义平台构建
bun build:custom [platform]
```

构建产物在 `dist/` 目录下

### 🧪 测试

```bash
# 运行单元测试
bun test

# 监听模式运行测试
bun test:watch

# 测试 UI 界面
bun test:ui

# 类型检查
bun type-check
```

### 🔍 代码质量

```bash
# 运行 ESLint 检查
bun lint

# 自动修复 ESLint 问题
bun lint:fix

# 更新依赖到最新版本
bun up
```

### 🎯 首次运行清单

在开始开发前，建议完成以下配置：

1. **更新项目信息**

   ```bash
   # 修改 package.json 中的项目名称和描述
   # 更新 manifest.config.ts 中的 appid 和应用信息
   ```

2. **配置开发环境**

   ```bash
   # 配置 src/config/domain.ts 中的 API 地址
   # 修改 src/config/app.ts 中的应用配置
   ```

3. **替换资源文件**

   ```bash
   # 替换 public/favicon.svg
   # 更新 src/static/ 目录下的图片资源
   ```

4. **设置主题**

   ```bash
   # 配置 src/theme.json 中的主题色彩
   # 自定义 src/styles/main.css 中的样式
   ```

## ⚙️ 配置说明

### 环境配置

在 `src/config/` 目录下配置项目相关信息：

- `app.ts` - 应用基础配置
- `domain.ts` - API 域名配置

### 主题配置

在 `src/theme.json` 中配置应用主题色彩。

### 国际化配置

在 `src/locale/` 目录下添加语言文件：

- `zh.json` - 中文
- `en.json` - 英文

### HTTP 请求配置

在 `src/utils/http/` 目录下配置请求相关：

- `index.ts` - 请求封装
- `auth.ts` - 认证相关
- `tool.ts` - 工具方法

## 📖 使用指南

### 页面路由

使用约定式路由，在 `src/pages/` 目录下创建 `.vue` 文件即可自动生成路由。

```bash
src/pages/
├── index.vue          # /pages/index/index
├── about.vue          # /pages/about/index
└── user/
    └── profile.vue    # /pages/user/profile/index
```

### 布局系统

在 `src/layouts/` 目录下创建布局组件，在页面中使用：

```vue
<template>
  <div>页面内容</div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
```

### 组件开发

组件会自动导入，直接在页面中使用即可：

```vue
<!-- 自动导入 src/components/NavBar/index.vue -->
<template>
  <NavBar title="页面标题" />
</template>
```

### Pinia 状态管理

使用 Pinia 进行状态管理，支持 TypeScript 和持久化：

```typescript
// src/store/user.ts
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
  }

  return {
    userInfo,
    token,
    setUserInfo,
    setToken,
    logout
  }
}, {
  // 启用持久化存储
  persist: {
    key: 'user-store',
    storage: 'localStorage', // H5 使用 localStorage，小程序使用 storage
    paths: ['userInfo', 'token'] // 指定需要持久化的字段
  }
})

// 在组件中使用
const userStore = useUserStore()
const { userInfo, token } = storeToRefs(userStore)
```

### HTTP 请求封装

HTTP 请求基于 Axios 封装，支持拦截器和自动错误处理：

```typescript
// src/api/user.ts
import { http } from '~/utils/http'

// 定义接口类型
interface UserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}

interface LoginParams {
  username: string
  password: string
}

// API 接口定义
export const userApi = {
  // 获取用户信息
  getUserInfo: (): Promise<UserInfo> => {
    return http.get('/api/user/info')
  },

  // 用户登录
  login: (params: LoginParams): Promise<{ token: string, userInfo: UserInfo }> => {
    return http.post('/api/auth/login', params)
  },

  // 更新用户信息
  updateUserInfo: (data: Partial<UserInfo>): Promise<UserInfo> => {
    return http.put('/api/user/info', data)
  },

  // 上传头像
  uploadAvatar: (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('avatar', file)
    return http.post('/api/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

// 在组件中使用
async function handleLogin() {
  try {
    const { token, userInfo } = await userApi.login({
      username: 'demo',
      password: '123456'
    })

    // 存储到 store
    const userStore = useUserStore()
    userStore.setToken(token)
    userStore.setUserInfo(userInfo)

    // 跳转到首页
    uni.switchTab({ url: '/pages/index/index' })
  }
  catch (error) {
    uni.showToast({
      title: '登录失败',
      icon: 'error'
    })
  }
}
```

## 🛠 开发工具

### 🎨 VS Code 扩展推荐

#### 必备扩展

- **Vue Language Features (Volar)** - Vue 3 语言支持和智能提示
- **TypeScript Vue Plugin (Volar)** - Vue 中的 TypeScript 支持
- **uni-app-schemas** - UniApp 配置文件智能提示
- **uni-app-snippets** - UniApp 代码片段

### 样式与 UI

- **UnoCSS IntelliSense** - UnoCSS 原子类提示与补全
- **Iconify IntelliSense** - 图标智能提示和预览
- **Color Highlight** - 颜色值高亮显示

#### 代码质量

- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier - Code formatter** - 代码格式化
- **Error Lens** - 内联显示错误和警告

#### 效率工具

- **Auto Rename Tag** - 自动重命名配对标签
- **Bracket Pair Colorizer** - 括号配对着色
- **GitLens** - Git 增强工具
- **Thunder Client** - API 测试工具

#### 主题推荐

- **One Dark Pro** - 流行的暗色主题
- **Material Theme** - Material Design 主题
- **GitHub Theme** - GitHub 风格主题

### 📱 调试工具

#### H5 调试

- **Chrome DevTools** - 浏览器开发者工具
- **Vue DevTools** - Vue 组件调试工具
- **Vite DevTools** - Vite 开发工具

#### 小程序调试

- **微信开发者工具** - 微信小程序官方调试工具
- **支付宝小程序开发者工具** - 支付宝小程序调试
- **百度智能小程序开发者工具** - 百度小程序调试

#### App 调试

- **HBuilderX** - UniApp 官方 IDE
- **Android Studio** - Android 应用调试
- **Xcode** - iOS 应用调试

### 🔧 命令行工具

```bash
# 全局安装推荐工具
bun add -g @dcloudio/uvm          # UniApp 版本管理
bun add -g @vue/cli               # Vue CLI
bun add -g typescript             # TypeScript 编译器
bun add -g eslint                 # ESLint 代码检查
bun add -g prettier               # Prettier 代码格式化
```

### 📊 性能分析

- **Lighthouse** - 网页性能分析
- **Bundle Analyzer** - 打包体积分析
- **Vue DevTools Profiler** - Vue 组件性能分析

## 📝 最佳实践

### 代码规范

- 使用 TypeScript 提供类型安全
- 遵循 ESLint 代码规范
- 使用 `<script setup>` 语法
- 组件名使用 PascalCase
- 文件名使用 kebab-case

### 性能优化

- 使用按需导入减少包体积
- 合理使用组件懒加载
- 优化图片资源大小
- 避免过度嵌套组件

### 项目管理

- 使用语义化的 commit 信息
- 及时更新依赖版本
- 编写单元测试
- 完善项目文档

## 📋 部署清单

使用此模板创建新项目时，请按照以下清单逐步配置：

### 🏷️ 项目基本信息

- [ ] **修改项目名称和描述**

  ```bash
  # 编辑 package.json
  {
    "name": "your-project-name",
    "description": "你的项目描述",
    "version": "1.0.0"
  }
  ```

- [ ] **更新应用配置**

  ```typescript
  // 编辑 manifest.config.ts
  export default defineManifest({
    name: '你的应用名称',
    appid: '__UNI__YOUR_APP_ID__', // 替换为你的 AppID
    description: '应用描述',
    // ... 其他配置
  })
  ```

### 🎨 资源文件替换

- [ ] **替换应用图标**
  - 替换 `public/favicon.svg`
  - 更新 `src/static/logo.png`
  - 准备各尺寸的应用图标

- [ ] **更新启动图和引导页**
  - 设计符合品牌的启动页面
  - 配置各平台的启动图资源

### ⚙️ 配置文件设置

- [ ] **API 配置**

  ```typescript
  // 编辑 src/config/domain.ts
  export const API_BASE_URL = {
    development: 'https://dev-api.yoursite.com',
    production: 'https://api.yoursite.com'
  }
  ```

- [ ] **应用配置**

  ```typescript
  // 编辑 src/config/app.ts
  export const APP_CONFIG = {
    name: '你的应用名称',
    version: '1.0.0',
    // ... 其他配置
  }
  ```

- [ ] **主题配置**

  ```json
  // 编辑 src/theme.json
  {
    "primaryColor": "#007AFF",
    "backgroundColor": "#F8F8F8"
  }
  ```

### 🌐 国际化设置

- [ ] **配置语言包**

  ```json
  // 编辑 src/locale/zh.json
  {
    "app": {
      "name": "你的应用名称",
      "welcome": "欢迎使用"
    }
  }
  ```

- [ ] **添加新语言支持**
  - 创建对应的语言文件
  - 在 `useLanguage.ts` 中添加语言选项

### 🔐 安全配置

- [ ] **环境变量设置**

  ```bash
  # 创建 .env.local 文件
  VITE_API_BASE_URL=https://your-api-domain.com
  VITE_APP_SECRET=your-app-secret
  ```

- [ ] **API 密钥配置**
  - 配置第三方服务 API 密钥
  - 设置支付相关配置

### 📱 平台特定配置

- [ ] **微信小程序**
  - 配置 AppID 和 AppSecret
  - 设置服务器域名白名单
  - 配置支付相关参数

- [ ] **支付宝小程序**
  - 配置应用 ID
  - 设置服务器域名

- [ ] **App 配置**
  - 配置应用签名
  - 设置推送服务
  - 配置第三方 SDK

### 🚀 部署配置

- [ ] **CI/CD 流程**

  ```yaml
  # .github/workflows/deploy.yml
  name: Deploy
  on:
    push:
      branches: [main]
  # ... 部署脚本
  ```

- [ ] **构建脚本优化**

  ```json
  // package.json scripts
  {
    "build:prod": "NODE_ENV=production bun build:h5",
    "deploy": "bun build:prod && your-deploy-command"
  }
  ```

### 🧹 清理工作

- [ ] **删除示例代码**
  - 清理 `src/pages/hi.vue` 等示例页面
  - 删除不需要的组件和工具函数
  - 清理测试相关的示例代码

- [ ] **更新文档**
  - 修改 `README.md` 为你的项目文档
  - 更新 `LICENSE` 文件中的作者信息
  - 完善项目使用说明

### ✅ 测试验证

- [ ] **功能测试**

  ```bash
  # 运行测试套件
  bun test

  # 类型检查
  bun type-check

  # 代码规范检查
  bun lint
  ```

- [ ] **构建测试**

  ```bash
  # 测试各平台构建
  bun build:h5
  bun build:mp-weixin
  bun build:app
  ```

- [ ] **兼容性测试**
  - 在不同设备和浏览器中测试
  - 验证各平台功能正常

### 📚 文档完善

- [ ] **API 文档**
  - 编写接口文档
  - 更新组件使用说明

- [ ] **部署文档**
  - 记录部署流程
  - 配置运维文档

## 🤝 贡献

我们欢迎所有形式的贡献！无论是报告 Bug、提出新功能建议，还是提交代码改进。

### 🐛 报告问题

如果你发现了 Bug 或有改进建议，请：

1. 在 [Issues](https://github.com/your-org/uniapp-starter/issues) 中搜索是否已有相关问题
2. 如果没有，请创建新的 Issue，详细描述问题或建议
3. 提供复现步骤、环境信息和相关截图

### 💡 提交代码

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 📝 代码规范

- 遵循项目的 ESLint 配置
- 使用 TypeScript 编写类型安全的代码
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 规范
- 为新功能添加相应的测试用例

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证 - 查看 LICENSE 文件了解详情。

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [UniApp](https://uniapp.dcloud.io/) - 跨平台应用开发框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
