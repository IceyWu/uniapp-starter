<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})
const props = withDefaults(defineProps<Props>(), {
  class: '',
  isNeedLeft: false,
  baseProps: () => ({
    border: false,
  }),
  isGoBack: false,
  placeholder: true,
  safeAreaInsetTop: true,
})

const emit = defineEmits(['click-left'])

interface BaseProps {
  title?: string
  backgroundColor?: string
  fixed?: boolean
  border?: boolean
}

interface Props {
  class?: string
  isNeedLeft?: boolean
  baseProps?: BaseProps
  isGoBack?: boolean
  placeholder?: boolean
  safeAreaInsetTop?: boolean
  isCustomLeftClick?: boolean
}

function goBack() {
  if (props?.isCustomLeftClick) {
    emit('click-left')
    return
  }
  if (!props?.isNeedLeft) {
    return
  }
  if (props?.isGoBack) {
    uni.navigateBack()
  }
}
const customStyle = computed(() => {
  return `background-color: ${
    props.baseProps?.backgroundColor
  } `
})
</script>

<template>
  <wd-navbar
    :title="baseProps?.title"
    :fixed="baseProps?.fixed"
    :bordered="baseProps?.border"
    :placeholder="placeholder"
    :safe-area-inset-top="safeAreaInsetTop"
    :class="props.class"
    :custom-style="customStyle"
    :left-arrow="isNeedLeft"
    custom-class="my-wd-navbar"
    @click-left="goBack"
  >
    <template v-if="isNeedLeft" #left>
      <slot name="left">
        <wd-icon name="thin-arrow-left" size="18px" color="#000000" />
      </slot>
    </template>

    <template #title>
      <view
        class="truncate"
      >
        <slot>
          {{ baseProps?.title }}
        </slot>
      </view>
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </wd-navbar>
</template>

<style lang="scss" scoped>
.wd-navbar__title {
  display: flex;
}
.nav-left-box {
  display: flex;
  align-items: center;
  justify-content: center;
  // background: red;
  // height: 100%;
  // width: 100%;
  // width: 60rpx;
  // height: 60rpx;
  // padding: 10rpx;
}
</style>

<style lang="scss">
:deep(.my-wd-navbar) {
  .wd-navbar__content {
    .wd-navbar__title {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
