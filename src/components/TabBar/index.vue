<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  userIdentity: {
    // 当前角色
    type: Number,
    default: 0,
  },
})

interface TabBarItem {
  pagePath: string
  iconPath: string
  selectedIconPath: string
  text: string
  iconWidth: number
  iconHeight: number
  fontSize?: number
  color?: string
  isRedirect: boolean
  isNeedLogin?: boolean
  bubbleStyle?: {
    top: string
    right: string
    backgroundImage?: string
  }
}

const selected = ref(2)
// const selected = defineModel<number>({
//   type: Number,
//   default: 0,
// })

const color = ref('#999999')
const selectedColor = ref('#262626')
// const list = ref();

// 申明list类型
const list = ref<TabBarItem[]>([
  {
    pagePath: '/pages/index',
    iconPath: 'i-fluent-accessibility-20-regular',
    selectedIconPath: 'i-fluent-accessibility-20-regular',
    text: '首页',
    iconWidth: 32,
    iconHeight: 35,
    isRedirect: false,
    isNeedLogin: false,
    bubbleStyle: {
      top: '4rpx',
      right: '14rpx',
      backgroundImage: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    },
  },

  {
    pagePath: '/pages/post/index',
    iconPath: 'i-carbon-add',
    selectedIconPath: 'i-carbon-add',
    text: '',
    iconWidth: 33,
    iconHeight: 35,
    fontSize: 50,
    isRedirect: false,
    isNeedLogin: true,
    // color: 'black',
  },

  {
    pagePath: '/pages/mine/index',
    iconPath: 'i-fluent-person-20-regular',
    selectedIconPath: 'i-fluent-person-20-regular',
    text: '我的',
    iconWidth: 31,
    iconHeight: 36,
    isRedirect: false,
    isNeedLogin: true,
    bubbleStyle: {
      top: '4rpx',
      right: '14rpx',
      backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    },
  },
])
// goToPage by History
function goToPageByHistory(path: string) {
  console.log('🌵-----path-----', path)
  const pages = getCurrentPages() || []
  console.log('🍧-----pages-----', pages)
  // 如果path以'/'开头，则去掉
  if (path.startsWith('/')) {
    path = path.slice(1)
  }
  const targetPathIndex = pages.findIndex(page => page.route === path)
  console.log('🌈-----targetPathIndex-----', targetPathIndex)
  if (targetPathIndex !== -1) {
    // 如果页面已存在于历史记录中，返回到该页面
    uni.navigateBack({
      delta: pages.length - targetPathIndex - 1,
    })
  }
  else {
    // 如果页面不存在于历史记录中，直接跳转
    uni.navigateTo({
      url: `/${path}`,
    })
  }
}

function switchTab(item: any, index: number) {
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

  selected.value
    = list.value.findIndex((item) => {
      return item.pagePath === objVal
    }) || 0
})
</script>

<template>
  <view class="tab-bar" :class="{ 'dark-tab-bar': isDark }">
    <view class="float-part">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="tab-bar-item"
        @click="switchTab(item, index)"
      >
        <view
          v-if="
            Object.keys(item.bubbleStyle || {}).length !== 0
              && selected === index
          "
          class="bubble-bg"
          :style="{
            marginTop: item?.bubbleStyle?.top,
            marginRight: item?.bubbleStyle?.right,
            backgroundImage: item?.bubbleStyle?.backgroundImage,
          }"
        />

        <text
          class="tab_img"
          :class="
            selected === index
              ? [item.selectedIconPath, 'icon-choosed']
              : [item.iconPath]
          "
          :style="{
            fontSize: `${item.fontSize}rpx`,
            color: item.color,
          }"
        />
        <view
          v-if="item.text"
          class="tab_text"
          :class="[selected === index ? 'choosed-text' : '']"
          :style="{ color: selected === index ? selectedColor : color }"
        >
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tab-bar {
  z-index: 999;
  position: fixed;
  bottom: 30rpx;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);

  .float-part {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 50rpx;
    width: 85%;
    height: 100%;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 6rpx;
    position: relative;

    &:nth-child(2) {
      transform: translateY(-40%);
      flex: none;
      width: 86rpx;
      height: 86rpx;
      border-radius: 50%;
      background: black;
      color: #fff;

      .tab_img {
        // font-size: 60rpx;

        // box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
      }
      .icon-choosed {
        color: #fff;
      }
    }

    .tab_img {
      font-size: 40rpx;
      font-weight: normal;
    }

    .tab_text {
      font-size: 24rpx;
      font-weight: 400;
      margin-top: 0;
    }

    .icon-choosed {
      // color: var(--primary-color, #000000);
      color: #000000;
    }
    .choosed-text {
      // 变大，动画时长0.5s
      // transform: scale(1.2);
      // transition: transform 0.5s;
    }
    .bubble-bg {
      position: absolute;
      top: 0;
      // left: 0;
      height: 20rpx;
      width: 20rpx;
      z-index: 998;
      border-radius: 50%;
      // 渐变气泡带点模糊
      background-size: 8rpx 8rpx;
      backdrop-filter: saturate(50%) blur(8rpx);
      background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
  }
}
.dark-tab-bar {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
