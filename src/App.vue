<script setup lang="ts">
  import { onLaunch } from '@dcloudio/uni-app'

  onLaunch(() => {
    // 初始化主题色
    initThemeColors()
  })
</script>

<style lang="scss">
@use 'uni-ui-plus/styles/theme/index.scss' as uniUiPlusTheme;
@use '@wot-ui/ui/styles/theme/index.scss' as wotTheme;
@import './styles/main.css';
</style>
