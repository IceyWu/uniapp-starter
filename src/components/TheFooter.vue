<script setup lang="ts">
// 空的 script setup，图标通过 Icon 组件处理
</script>

<template>
  <div class="flex gap-4 mt-5 justify-center text-xl">
    <div title="Home" @click="router.replace('/pages/index')">
      <Icon name="campsite" class="icon-btn" :size="20" />
    </div>

    <div title="SubPages" @click="router.push('/pages-sub/index')">
      <Icon name="sub-volume" class="icon-btn" :size="20" />
    </div>

    <div class="icon-btn" title="Toggle dark mode" @click="toggleDark()">
      <Icon :name="isDark ? 'moon' : 'sun'" :size="20" />
    </div>

    <div class="icon-btn" title="GitHub" @click="router.push('https://github.com/Ares-Chang/uni-vitesse')">
      <Icon name="logo-github" :size="20" />
    </div>
  </div>
</template>
