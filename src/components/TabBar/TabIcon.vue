<script setup lang="ts">
import { computed } from 'vue'
import { Icon_Enum } from '@/utils/enum'

interface Props {
  name: string
  size?: number | string
  color?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  className: '',
})

// 简化的图标映射 - 使用现有的 Icon_Enum
const iconMap: Record<string, string> = {
  'i-fluent-accessibility-20-regular': Icon_Enum.home,
  'i-carbon-add': Icon_Enum.playground,
  'i-fluent-person-20-regular': Icon_Enum.mine,
}

const iconSvg = computed(() => {
  return iconMap[props.name] || ''
})

const iconStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    styles.width = size
    styles.height = size
  }

  if (props.color) {
    styles.color = props.color
  }

  return styles
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
  <view :class="className" :style="iconStyle" v-html="iconSvg" />
</template>
