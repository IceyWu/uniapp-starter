<script lang="ts" setup>
const pageInfo = arrayLast(getCurrentPages())
const objVal = getObjVal(pageInfo, ['$page', 'meta', 'navigationBar'])
</script>

<template>
  <view
    class="app"
    :class="{
      dark: isDark,
    }"
  >
    <NavBar
      :base-props="{
        title: objVal?.titleText,
      }"
    />
    <scroll-view :enhanced="true" :bounces="false" :scroll-y="true" :show-scrollbar="false" class="app-container">
      <slot />
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.app-container{

  /*  #ifdef  MP-WEIXIN  */
  height: calc(100vh - env(safe-area-inset-bottom) - 88rpx - 76rpx);
  /*  #endif  */
  /*  #ifndef  MP-WEIXIN */
  height: calc(100vh - env(safe-area-inset-bottom) - 106rpx);
  /*  #endif  */
  background-color: #F5F5F5;
}
</style>
