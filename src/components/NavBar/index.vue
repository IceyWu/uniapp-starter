<script setup lang="ts">
import type { UniNavBarProps } from '@uni-helper/uni-ui-types'
import { ref } from 'vue'

interface Props {
  class?: string
  baseProps?: UniNavBarProps
}
const { baseProps } = defineProps<Props>()

// const emit = defineEmits<{
//   goBack: []
// }>()
const { safeAreaInsets } = uni.getSystemInfoSync()
const safeTopVal = ref(safeAreaInsets?.top)
const statusBarHeight = ref(44)
onReady(() => {
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  if (safeTopVal.value === 0)
    safeTopVal.value = menuButtonInfo.top
  statusBarHeight.value = menuButtonInfo.height
})
const backgroundColorBase = computed(() => {
  return isDark.value ? 'rgb(18,18,18)' : 'rgb(255,255,255)'
})
function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view
    class="nav-box"
    :style="{
      position: baseProps?.fixed ? 'fixed' : 'relative',
      backgroundColor: baseProps?.backgroundColor || backgroundColorBase,
      paddingTop: `${safeTopVal}px`,
    }"
  >
    <view
      class="nav-main"
      :style="{
        height: `${statusBarHeight}px`,
      }"
    >
      <view class="nav-left">
        <slot name="left">
          <div
            class="icon-btn"
            title="返回"
            @click="goBack"
          >
            <div class="i-carbon:chevron-left text-xl" />
          </div>
        </slot>
      </view>
      <view class="nav-title">
        <slot>
          {{ baseProps?.title }}
        </slot>
      </view>

      <view class="nav-right">
        <slot name="right" />
      </view>
    </view>
    <view class="nav-placeholder" />
  </view>
</template>

<style lang="scss" scoped>
.nav-box {
  z-index: 999;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20rpx;
  .nav-placeholder{
    height: 14rpx;
    width: 100%;
  }

  .nav-main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: red;
    .nav-title {
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: normal;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 35rpx;
      text-align: center;
      flex: 1;
    }
    .nav-left{
      flex: 1;
      display: flex;
      justify-content: flex-start;
    }
    .nav-right{
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
