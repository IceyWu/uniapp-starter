# UniApp Starter Template

<p align='center'>
  <img src='./public/favicon.svg' alt='UniApp Starter Template' width='120'/>
</p>

<h5 align='center'>
<b>🚀 Modern UniApp Development Template</b>
</h5>

<br/>

<p align='center'>
<a href="./README.md">简体中文</a> | <b>English</b>
</p>

<br/>

A feature-rich, production-ready UniApp development template with modern toolchain and best practices. Supporting multi-platform deployment with excellent development experience.

## ✨ Features

### 🔧 Development Experience

- ⚡️ [Vue 3](https://github.com/vuejs/core) + [Vite](https://github.com/vitejs/vite) + [TypeScript](https://www.typescriptlang.org/) - Modern development stack
- 🗂 [File-based routing](./src/pages) - Automatic route generation based on file system
- 📦 [Auto-import components](./src/components) - No need to manually import components
- 📑 [Layout system](./src/layouts) - Flexible page layout management
- 🔥 [`<script setup>`](https://github.com/vuejs/rfcs/pull/227) - Latest Vue syntax
- 📥 [Auto-import APIs](./src/composables) - Direct use of Composition API

### 🎨 Styling & UI

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - High-performance atomic CSS engine
- 😃 [Iconify](https://iconify.design) - Massive icon library support
- 🌙 Dark mode support - Built-in theme switching
- � Responsive design - Perfect adaptation to various screen sizes

### 🛠 Engineering

- 🍍 [Pinia](https://pinia.vuejs.org) - Modern state management
- 🌐 [Vue I18n](https://vue-i18n.intlify.dev/) - Internationalization support
- 🔐 HTTP client - Request wrapper based on Axios
- 📊 Data persistence - Pinia state persistence
- ✅ [Vitest](https://vitest.dev/) - Unit testing framework
- 📝 [ESLint](https://eslint.org/) - Code linting
- 🔒 Git Hooks - Pre-commit code checking

### � Cross-platform Support

- 📱 App (Android/iOS)
- 🌐 H5
- 🔧 WeChat Mini Program
- 🔧 Alipay Mini Program
- 🔧 Baidu Mini Program
- 🔧 ByteDance Mini Program
- 🔧 QQ Mini Program
- 🔧 Kuaishou Mini Program
- 🔧 JD Mini Program
- 🔧 Lark Mini Program

## 🧰 Tech Stack

### Core Frameworks

- **Vue 3** - Progressive JavaScript framework
- **UniApp** - Cross-platform application development framework
- **TypeScript** - Typed superset of JavaScript

### Build Tools

- **Vite** - Next generation frontend tooling
- **ESBuild** - Extremely fast JavaScript bundler
- **Bun** - Modern JavaScript runtime and package manager

### State Management

- **Pinia** - Vue 3 official state management library
- **pinia-plugin-persistedstate** - Pinia state persistence plugin
- **pinia-auto-refs** - Pinia auto-reference plugin

### Styling Solution

- **UnoCSS** - Atomic CSS engine
- **@uni-helper/unocss-preset-uni** - UniApp UnoCSS preset
- **Sass** - CSS preprocessor

### HTTP Client

- **Axios** - HTTP client library
- Custom request interceptors
- Request/Response interception support
- Automatic token management

### Utility Libraries

- **dayjs** - Lightweight date manipulation library
- **js-md5** - MD5 hashing library
- **spark-md5** - File MD5 calculation
- **qs** - Query string parsing and stringifying
- **blurhash** - Image blur hash
- **gm-crypto** - Cryptographic utility library

### Development Tools

- **ESLint** - Code linting tool
- **@uni-helper/eslint-config** - UniApp ESLint configuration
- **Vitest** - Unit testing framework
- **Vue DevTools** - Vue developer tools
- **simple-git-hooks** - Git hooks tool
- **lint-staged** - Pre-commit code checking

### Plugin System

- **unplugin-auto-import** - API auto-import
- **unplugin-vue-components** - Component auto-import
- **@uni-helper/vite-plugin-uni-pages** - File-based routing system
- **@uni-helper/vite-plugin-uni-layouts** - Layout system
- **@uni-helper/vite-plugin-uni-manifest** - manifest.json generation

## 📁 Project Structure

```
uniapp-starter/
├── public/                    # Static assets
├── src/
│   ├── @types/               # TypeScript type definitions
│   ├── api/                  # API interface wrappers
│   ├── components/           # Shared components
│   │   ├── Base/            # Base components
│   │   ├── LivePhoto/       # Live photo component
│   │   ├── LPImage/         # Image component
│   │   ├── NavBar/          # Navigation bar
│   │   └── TabBar/          # Tab bar
│   ├── composables/         # Composable functions
│   ├── config/              # Configuration files
│   ├── hooks/               # Custom hooks
│   ├── layouts/             # Layout components
│   ├── locale/              # Internationalization files
│   ├── pages/               # Page components
│   ├── pages-sub/           # Sub-package pages
│   ├── static/              # Static resources
│   ├── store/               # State management
│   ├── styles/              # Style files
│   ├── test/                # Test files
│   └── utils/               # Utility functions
│       ├── http/            # HTTP request wrapper
│       ├── tools/           # Tool methods
│       └── upload/          # Upload related
├── auto/                     # Auto-generation tools
├── commitlint.config.js     # Commit message standards
├── eslint.config.mjs        # ESLint configuration
├── manifest.config.ts       # UniApp configuration
├── pages.config.ts          # Page configuration
├── tsconfig.json            # TypeScript configuration
├── uno.config.ts            # UnoCSS configuration
└── vite.config.ts           # Vite configuration
```

## 🚀 Quick Start

### Requirements

- Node.js >= 18
- Bun >= 1.0 (recommended) or pnpm >= 8

### Installation

```bash
# CLI create project
# Coming soon...

# Or clone repository
git clone <your-repo-url> my-uniapp-project
cd my-uniapp-project

# Install dependencies
bun install
# or
pnpm install
```

### Development

```bash
# H5 development
bun dev
# or
bun dev:h5

# WeChat Mini Program development
bun dev:mp-weixin

# App development
bun dev:app

# Other platforms
bun dev:mp-alipay    # Alipay Mini Program
bun dev:mp-baidu     # Baidu Mini Program
bun dev:mp-toutiao   # ByteDance Mini Program
bun dev:mp-qq        # QQ Mini Program
```

### Build

```bash
# H5 build
bun build:h5

# WeChat Mini Program build
bun build:mp-weixin

# App build
bun build:app

# Other platform builds
bun build:mp-alipay  # Alipay Mini Program
bun build:mp-baidu   # Baidu Mini Program
```

### Testing

```bash
# Run unit tests
bun test

# Type checking
bun type-check

# Code linting
bun lint

# Code formatting
bun lint:fix
```

## ⚙️ Configuration

### Environment Configuration

Configure project-related information in the `src/config/` directory:

- `app.ts` - Application basic configuration
- `domain.ts` - API domain configuration

### Theme Configuration

Configure application theme colors in `src/theme.json`.

### Internationalization Configuration

Add language files in the `src/locale/` directory:

- `zh.json` - Chinese
- `en.json` - English

### HTTP Request Configuration

Configure request-related settings in the `src/utils/http/` directory:

- `index.ts` - Request wrapper
- `auth.ts` - Authentication related
- `tool.ts` - Utility methods

## 📖 Usage Guide

### Page Routing

Use file-based routing by creating `.vue` files in the `src/pages/` directory to automatically generate routes.

```bash
src/pages/
├── index.vue          # /pages/index/index
├── about.vue          # /pages/about/index
└── user/
    └── profile.vue    # /pages/user/profile/index
```

### Layout System

Create layout components in the `src/layouts/` directory and use them in pages:

```vue
<template>
  <div>Page content</div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
```

### Component Development

Components are auto-imported, use them directly in pages:

```vue
<!-- Auto-imports src/components/NavBar/index.vue -->
<template>
  <NavBar title="Page Title" />
</template>
```

### State Management

Use Pinia for state management:

```typescript
// src/store/user.ts
export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)

  const setUserInfo = (info: any) => {
    userInfo.value = info
  }

  return { userInfo, setUserInfo }
}, {
  // Enable persistence
  persist: true
})
```

### API Calls

```typescript
// src/api/user.ts
export function getUserInfo() {
  return http.get('/api/user/info')
}

// Use in components
const { data } = await getUserInfo()
```

## 🛠 Development Tools

### VS Code Extensions Recommended

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- UnoCSS
- ESLint
- Prettier
- uni-app-schemas
- uni-app-snippets

### Debugging Tools

- Vue DevTools - Vue debugging
- WeChat Developer Tools - Mini Program debugging
- Chrome DevTools - H5 debugging

## 📝 Best Practices

### Code Standards

- Use TypeScript for type safety
- Follow ESLint code standards
- Use `<script setup>` syntax
- Component names use PascalCase
- File names use kebab-case

### Performance Optimization

- Use on-demand imports to reduce bundle size
- Proper use of component lazy loading
- Optimize image resource sizes
- Avoid excessive component nesting

### Project Management

- Use semantic commit messages
- Update dependencies in time
- Write unit tests
- Maintain project documentation

## 📋 Deployment Checklist

When using this template, please update project information according to the following checklist:

- [ ] Modify project name and description in `package.json`
- [ ] Update application information and appid in `manifest.config.ts`
- [ ] Replace icon files in the `public/` directory
- [ ] Configure related settings in the `src/config/` directory
- [ ] Update author information in the `LICENSE` file
- [ ] Clean up demo pages and components
- [ ] Configure CI/CD pipeline
- [ ] Set production environment variables

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

---

If this template helps you, please give it a ⭐️ for support!
