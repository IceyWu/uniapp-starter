<template>
  <view
    class="app" :class="{
      dark: isDark,
    }"
  >
    <slot />
    <TabBar />
  </view>
</template>
