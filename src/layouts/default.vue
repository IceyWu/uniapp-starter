<script lang="ts" setup>
import { arrayLast, getObjVal } from '@iceywu/utils'

const pageInfo = arrayLast(getCurrentPages())
const objVal = getObjVal(pageInfo, ['$page', 'meta', 'navigationBar'])
const { themeVars } = useTheme()
</script>

<template>
  <wd-config-provider :theme="isDark ? 'dark' : 'light'" :theme-vars="themeVars">
    <view
      class="app-box"
      :class="{
        dark: isDark,
      }"
    >
      <view class="title">
        <slot name="navbar">
          <NavBar
            is-need-left
            :base-props="{
              title: objVal?.titleText,
            }"
          >
            <template #left>
              <div
                class="icon-btn"
                title="Toggle dark mode"
                @click="toggleDark()"
              >
                <div class="i-carbon-sun dark:i-carbon-moon" />
              </div>
            </template>
          </NavBar>
        </slot>
      </view>
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
  .title {
    flex-shrink: 0;
  }
  .page-content {
    flex: 1;
    overflow: hidden;
    .app-container {
      height: 100%;
    }
  }
}
</style>
