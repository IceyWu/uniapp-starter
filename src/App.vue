<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  // 初始化主题色
  initThemeColors()
})
</script>

<style lang="scss">
@import './styles/main.css';
</style>
