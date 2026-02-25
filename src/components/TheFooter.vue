<template>
  <div class="mt-5 justify-center text-xl flex flex-gap-4">
    <div title="Home" @click="router.replace('/pages/index')">
      <div class="i-carbon-campsite icon-btn"/>
    </div>

    <div title="SubPages" @click="router.push('/pages-sub/index')">
      <div class="i-carbon-sub-volume icon-btn"/>
    </div>

    <div class="icon-btn" title="Toggle dark mode" @click="toggleDark()">
      <div :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'"/>
    </div>

    <div
      class="icon-btn"
      title="GitHub"
      @click="router.push('https://github.com/IceyWu/uniapp-starter')"
    >
      <div class="i-carbon-logo-github"/>
    </div>
  </div>
</template>
