<script lang="ts" setup>
const pageInfo = arrayLast(getCurrentPages())
const objVal = getObjVal(pageInfo, ['$page', 'meta', 'navigationBar'])
</script>

<template>
  <view

    class="app" :class="{
      dark: isDark,
    }"
  >
    <NavBar
      :base-props="{
        title: objVal?.titleText,
      }"
    >
      <template #left>
        <div
          icon-btn title="Toggle dark mode"
          @click="toggleDark()"
        >
          <div i-carbon-sun dark:i-carbon-moon />
        </div>
      </template>
    </NavBar>
    <slot />
    <TabBar />
  </view>
</template>
