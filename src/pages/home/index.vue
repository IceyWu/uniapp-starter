<script setup lang="ts">
definePage(() => ({
    layout: 'home',
  }))

const scrollH = ref(500)

onShow(() => {})
onLoad(() => {
  uni.getSystemInfo({
    success: (res: any) => {
      scrollH.value = res.windowHeight - res.statusBarHeight - 44
    },
  })
})
</script>

<template>
  <view class="content-box">
    <NavBar
      is-need-left
      :base-props="{
        fixed: false,
        border: false,
        backgroundColor: 'transparent',
      }"
    >
      <template #left>
        <view>推荐</view>
      </template>
    </NavBar>
    <div class="main-content">
      <WaterfallsList auto-load />
    </div>
  </view>
</template>

<style scoped lang="scss">
.content-box {
  height: 100%;
  display: flex;
  flex-direction: column;

  .main-content {
    height: 100%;
    box-sizing: border-box;
    // flex: 1;
  }
}
</style>
