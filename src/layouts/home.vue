<script lang="ts" setup>
const { themeVars } = useTheme()
</script>

<template>
  <wd-config-provider :theme="isDark ? 'dark' : 'light'" :theme-vars="themeVars">
    <view
      class="app-box" :class="{
        dark: isDark,
      }"
    >
      <view class="page-content">
        <scroll-view
          :enhanced="true"
          :bounces="false"
          :scroll-y="true"
          :show-scrollbar="false"
          class="app-container"
        >
          <slot />
        </scroll-view>
      </view>
      <TabBar />
    </view>
  </wd-config-provider>
</template>

<style lang="scss" scoped>
.app-box {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: calc(env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  .page-content {
    flex: 1;
    overflow: hidden;
    .app-container {
      height: 100%;
    }
  }
}
</style>
