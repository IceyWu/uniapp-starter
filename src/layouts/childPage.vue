<script lang="ts" setup>
import { arrayLast, getObjVal } from '@iceywu/utils'

const pageInfo = arrayLast(getCurrentPages())
const objVal = getObjVal(pageInfo, ['$page', 'meta', 'navigationBar'])
</script>

<template>
  <view
    class="app-box" :class="{
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
        />
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
  </view>
</template>

<style lang="scss" scoped>
.app-box {
  height: 100vh;
  box-sizing: border-box;
    padding-bottom:calc( env(safe-area-inset-bottom) );
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
        background-color: #F5F5F5;
      }
    }
}
</style>
