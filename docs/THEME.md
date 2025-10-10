# Wot-UI 主题定制指南

## 概述

本项目已集成 wot-design-uni 的主题系统，支持暗色模式和自定义主题变量。

## 已实现的功能

### 1. 暗色模式支持

所有 layout 文件都已包裹 `wd-config-provider`，支持自动切换暗色模式：

- `default.vue` - 默认布局（带导航栏和底部标签栏）
- `home.vue` - 首页布局（仅底部标签栏）
- `childPage.vue` - 子页面布局（带导航栏）

### 2. 主题配置

使用 `useTheme` composable 来管理主题变量。

## 使用方法

### 基础使用（仅暗色模式）

当前配置已支持暗色模式，无需额外配置：

```vue
<template>
  <wd-config-provider :theme="isDark ? 'dark' : 'light'">
    <!-- 您的内容 -->
  </wd-config-provider>
</template>
```

### 自定义主题变量

如果需要自定义主题色，可以使用 `theme-vars` 属性：

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// 自定义主题变量
const { themeVars } = useTheme({
  colorTheme: '#07c160', // 主题色
  colorSuccess: '#34d19d', // 成功色
  colorWarning: '#f0883a', // 警告色
  colorDanger: '#fa4350', // 危险色
  buttonPrimaryBgColor: '#07c160', // 按钮主色
})
</script>

<template>
  <wd-config-provider
    :theme="isDark ? 'dark' : 'light'"
    :theme-vars="themeVars"
  >
    <!-- 您的内容 -->
  </wd-config-provider>
</template>
```

### 在页面中切换主题

```vue
<script setup lang="ts">
import { isDark, toggleDark } from '@/composables/useDark'
</script>

<template>
  <button @click="toggleDark()">
    切换主题 (当前: {{ isDark ? '暗色' : '亮色' }})
  </button>
</template>
```

## 可用的主题变量

### 基础色彩

- `colorTheme` - 主题色
- `colorSuccess` - 成功色
- `colorWarning` - 警告色
- `colorDanger` - 危险色
- `colorInfo` - 信息色

### 组件色彩

- `buttonPrimaryBgColor` - 主按钮背景色
- `buttonPrimaryColor` - 主按钮文字色
- `buttonNormalBg` - 普通按钮背景色

### 中性色

暗色模式和亮色模式会自动应用不同的中性色方案，无需手动配置。

## 全局样式定制

如果需要自定义全局的暗色模式样式，可以在 CSS 中使用：

```css
/* 暗色模式下的全局样式 */
.wot-theme-dark body {
  color: #f5f5f5;
  background-color: #000000;
}

/* 或者使用您的自定义 class */
.dark {
  /* 自定义暗色样式 */
}
```

## 使用 CSS 变量直接定制

也可以通过 CSS 变量直接覆盖主题：

```css
:root,
page {
  --wot-color-theme: #4D80F0;
  --wot-color-success: #34d19d;
  --wot-button-primary-bg-color: #07c160;
}
```

## 参考文档

- [ConfigProvider 组件文档](https://wot-design-uni.netlify.app/component/config-provider.html)
- [主题定制指南](https://wot-design-uni.netlify.app/guide/custom-theme.html)
- [设计变量说明](https://wot-design-uni.netlify.app/guide/design.html)

## 注意事项

1. 所有使用 wot-ui 组件的页面都应该被 `wd-config-provider` 包裹
2. 主题变量的修改会影响所有被包裹的组件
3. CSS 变量命名规则：驼峰命名会转换为 kebab-case（如 `buttonPrimaryBgColor` → `--wot-button-primary-bg-color`）
4. 暗色模式状态存储在本地，刷新后会保持
