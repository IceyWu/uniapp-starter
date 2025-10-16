<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  userIdentity: {
    type: Number,
    default: 0,
  },
})

interface TabBarItem {
  pagePath: string
  iconPath: string
  selectedIconPath: string
  text: string
  isRedirect: boolean
  isNeedLogin?: boolean
}

const selected = ref(0)
const color = ref('#86909c') // Arco 次要文字色

// 获取主题色
const { themeVarsExtended } = useTheme()

// 滚动相关状态
const isExpanded = ref(true) // 是否展开状态
const lastScrollTop = ref(0) // 上次滚动位置
const scrollThreshold = 50 // 滚动阈值（px）
const expandThreshold = 100 // 距离顶部多少距离内才展开（px）
const manualExpanded = ref(false) // 用户手动展开

// 处理页面滚动
function handleScroll(scrollTop: number) {
  // 如果用户手动展开了，需要滚动一定距离才能重新自动控制
  if (manualExpanded.value) {
    if (Math.abs(scrollTop - lastScrollTop.value) > scrollThreshold * 3) {
      manualExpanded.value = false
    }
    lastScrollTop.value = scrollTop
    return
  }

  // 向下滚动且超过阈值，收起
  if (scrollTop > lastScrollTop.value && scrollTop > scrollThreshold) {
    isExpanded.value = false
  }
  // 只有滚动到距离顶部一定距离内才展开
  else if (scrollTop < expandThreshold) {
    isExpanded.value = true
  }

  lastScrollTop.value = scrollTop
}

// TabBar 列表配置
const list = ref<TabBarItem[]>([
  {
    pagePath: '/pages/index',
    iconPath: 'i-carbon-home',
    selectedIconPath: 'i-carbon-home',
    text: '首页',
    isRedirect: false,
    isNeedLogin: false,
  },
  {
    pagePath: '/pages/mine/index',
    iconPath: 'i-carbon-user',
    selectedIconPath: 'i-carbon-user',
    text: '我的',
    isRedirect: false,
    isNeedLogin: true,
  },
])

// 监听页面滚动事件 - 使用 uni.$on
const scrollEventName = 'pageScroll'

// 监听页面滚动
function setupPageScroll() {
  // 监听全局滚动事件
  uni.$on(scrollEventName, handleScroll)
}

// 手动切换展开/收起
function toggleExpand() {
  isExpanded.value = !isExpanded.value
  manualExpanded.value = true

  // 3秒后允许自动控制
  setTimeout(() => {
    manualExpanded.value = false
  }, 3000)
}

function switchTab(item: TabBarItem, index: number) {
  // 如果是折叠状态，点击只展开，不跳转
  if (!isExpanded.value) {
    toggleExpand()
    return
  }

  // 展开状态下才执行跳转
  selected.value = index

  if (item.isRedirect) {
    uni.redirectTo({
      url: item.pagePath,
    })
  }
  else {
    uni.navigateTo({
      url: item.pagePath,
    })
  }
}

onMounted(() => {
  const pageInfo = arrayLast(getCurrentPages())
  const objVal = getObjVal(pageInfo, ['$page', 'fullPath'])

  // 更精确的路由匹配
  const currentPath = objVal || ''
  selected.value = list.value.findIndex((item) => {
    // 精确匹配或包含匹配
    return currentPath.includes(item.pagePath) || item.pagePath.includes(currentPath.split('?')[0])
  })

  // 如果没有匹配到，默认选中第一个
  if (selected.value === -1) {
    selected.value = 0
  }

  // 设置页面滚动监听
  setupPageScroll()
})

onUnmounted(() => {
  // 清理滚动监听
  uni.$off(scrollEventName, handleScroll)
})
</script>

<template>
  <view class="tab-bar" :class="[isDark ? 'dark-tab-bar' : '', !isExpanded ? 'collapsed' : '']">
    <view class="float-part card-base" :class="{ collapsed: !isExpanded }">
      <!-- TabBar items -->
      <template v-for="(item, index) in list" :key="index">
        <view
          v-if="isExpanded || selected === index"
          class="tab-bar-item"
          :class="{
            collapsed: !isExpanded,
            active: selected === index,
          }"
          :style="{
            '--tab-primary-color': themeVarsExtended.primary,
            '--tab-primary-light': themeVarsExtended.primaryLight,
            '--tab-primary-shadow': themeVarsExtended.primaryShadow,
          }"
          @click="switchTab(item, index)"
        >
          <text
            class="tab_img"
            :class="selected === index ? [item.selectedIconPath, 'icon-choosed'] : [item.iconPath]"
          />
          <view
            v-if="item.text && isExpanded"
            class="tab_text"
            :class="[selected === index ? 'choosed-text' : '']"
            :style="{ color: selected === index ? themeVarsExtended.primary : color }"
          >
            {{ item.text }}
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// ==================== TabBar 核心配置 ====================
// 基础尺寸
$tabbar-width: 80%;                    // 展开宽度
$tabbar-max-width: 500rpx;             // 最大宽度
$collapsed-size: 80rpx;                // 折叠按钮尺寸
$icon-size: 36rpx;                     // 图标大小

// 主题色 - 通过内联样式传递的 CSS 变量
$primary-color: var(--tab-primary-color, var(--wot-color-theme, #165DFF));
$primary-light: var(--tab-primary-light, rgba(22, 93, 255, 0.1));
$primary-shadow: var(--tab-primary-shadow, rgba(22, 93, 255, 0.4));

// Arco Design 文字色
$text-color: #4e5969;           // 浅色模式次要文字
$text-color-secondary: #86909c; // 浅色模式辅助文字

// Arco Design 深色模式文字色
$dark-text: #86909c;            // 深色模式次要文字
$dark-text-active: #e5e6eb;     // 深色模式高亮文字

// ==================== 样式定义 ====================
.tab-bar {
  z-index: 999;
  position: fixed;
  bottom: 20rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &.collapsed {
    bottom: 30rpx;
    left: 30rpx;
    right: auto;
    justify-content: flex-start;
  }

  .float-part {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 50rpx;
    width: $tabbar-width;
    max-width: $tabbar-max-width;
    background: rgba(255, 255, 255, 0.75); // 提高不透明度
    backdrop-filter: blur(20rpx) saturate(180%);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08); // Arco 阴影
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 12rpx 20rpx;

    &.collapsed {
      width: auto;
      padding: 0;
      background: transparent;
      backdrop-filter: none;
      box-shadow: none;
      border-radius: 50%;
    }
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rpx;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 12rpx 8rpx;
    border-radius: 28rpx;
    cursor: pointer;

    // 展开状态高亮
    &:not(.collapsed) {
      &.active {
        background: $primary-light;

        .tab_img {
          color: $primary-color;
          transform: translateY(-2rpx);
        }

        .tab_text {
          color: $primary-color;
          font-weight: 600;
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }

    // 折叠状态
    &.collapsed {
      flex: none;
      width: $collapsed-size;
      height: $collapsed-size;
      padding: 0;
      border-radius: 50%;
      background: $primary-color;
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 6rpx $primary-light;

      &.active {
        animation: iconPulse 2s ease-in-out infinite;
      }

      .tab_img {
        font-size: $icon-size + 6rpx;
        color: #fff;
      }

      &:active {
        transform: scale(0.9);
      }
    }

    .tab_img {
      font-size: $icon-size;
      transition: all 0.3s ease;
      color: $text-color;
    }

    .tab_text {
      font-size: 20rpx;
      font-weight: 500;
      transition: all 0.3s ease;
      white-space: nowrap;
      color: $text-color;
    }
  }

  @keyframes iconPulse {
    0%, 100% {
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 6rpx $primary-light;
    }
    50% {
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 10rpx $primary-light;
    }
  }
}

// 深色模式
.dark-tab-bar {
  .float-part {
    background: rgba(35, 35, 36, 0.95); // Arco 深色容器背景
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.6); // 更深的阴影

    &.collapsed {
      background: transparent;
      box-shadow: none;
    }
  }

  .tab-bar-item {
    &:not(.collapsed).active {
      background: $primary-light;

      .tab_img, .tab_text {
        color: $primary-color;
      }
    }

    &.collapsed {
      background: $primary-color;
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 6rpx $primary-light;

      &.active {
        animation: iconPulseDark 2s ease-in-out infinite;
      }
    }

    .tab_img, .tab_text {
      color: $dark-text; // Arco 深色次要文字
    }

    &.active {
      .tab_img, .tab_text {
        color: $dark-text-active; // 深色模式下激活状态使用更亮的文字
      }
    }
  }

  @keyframes iconPulseDark {
    0%, 100% {
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 6rpx $primary-light;
    }
    50% {
      box-shadow: 0 6rpx 20rpx $primary-shadow,
                  0 0 0 10rpx $primary-light;
    }
  }
}
</style>
