<script lang="ts" setup>
  import { ref } from 'vue'
  import { getPicsumDetail } from '@/api/apiPicsum'

  definePage({
    layout: 'custom',
  })

  const detailData = ref({
    id: '',
    cover: '',
    title: '',
    desc: '',
    author: '',
    avatar: '',
    content: '',
    likes: 0,
    comments: 0,
  })

  const navOpacity = ref(0)
  const loading = ref(true)

  onLoad(async (e: any) => {
    const id = e.id || '0'
    try {
      const res: any = await getPicsumDetail(id)
      detailData.value = {
        id: res.id,
        cover: res.download_url,
        title: res.author,
        desc: `Photo #${res.id} · ${res.width}×${res.height}`,
        author: res.author,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.author}`,
        content: `由 ${res.author} 拍摄，原始尺寸 ${res.width}×${res.height}。`,
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
      }
    } catch {
      uni.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      loading.value = false
    }
  })

  const handleScroll = (e: any) => {
    const scrollTop = e.detail.scrollTop
    const opacity = Math.min(scrollTop / 150, 1)
    navOpacity.value = opacity
  }
</script>

<template>
  <view class="h-screen relative overflow-hidden">
    <!-- 自定义导航栏 -->
    <NavBar
      is-need-left
      is-go-back
      :placeholder="false"
      :base-props="{
        title: navOpacity > 0.5 ? '详情' : '',
        fixed: true,
        border: false,
        backgroundColor: `rgba(255, 255, 255, ${navOpacity})`,
      }"
      class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    />

    <scroll-view scroll-y class="h-full" @scroll="handleScroll">
      <view class="bg-gray-50 pb-20 min-h-full">
        <!-- 顶部大图 -->
        <image
          :src="detailData.cover"
          mode="aspectFill"
          class="w-full h-80 bg-gray-200 block"
        />

        <!-- 内容区域 -->
        <view
          class="relative -mt-6 bg-white rounded-t-3xl px-5 pt-6 pb-8 shadow-sm min-h-[60vh]"
        >
          <!-- 作者信息 -->
          <view class="flex items-center justify-between mb-4">
            <view class="flex items-center gap-3">
              <image
                :src="detailData.avatar"
                class="w-10 h-10 rounded-full bg-gray-100"
              />
              <text class="text-base font-medium text-gray-800">
                {{ detailData.author }}
              </text>
            </view>
            <button
              type="button"
              class="m-0 px-4 py-1.5 text-sm text-white bg-blue-500 rounded-full border-none leading-normal"
            >
              关注
            </button>
          </view>

          <!-- 标题和描述 -->
          <text class="block text-2xl font-bold text-gray-900 mb-2">
            {{ detailData.title }}
          </text>
          <text class="block text-base text-gray-500 mb-6 leading-relaxed">
            {{ detailData.desc }}
          </text>

          <!-- 正文内容 -->
          <view class="text-gray-700 text-base leading-loose">
            <text>{{ detailData.content }}</text>
            <text class="block mt-4">更多精彩内容，敬请期待...</text>
          </view>

          <!-- 标签 -->
          <view class="flex flex-wrap gap-2 mt-6">
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              # 摄影
            </text>
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              # 生活
            </text>
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              # 随手拍
            </text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center justify-between pb-safe z-50"
    >
      <view class="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-4">
        <text class="text-gray-400 text-sm">说点什么...</text>
      </view>
      <view class="flex items-center gap-4">
        <view class="flex items-center gap-1">
          <view class="i-carbon-favorite text-xl text-gray-600"></view>
          <text class="text-sm text-gray-600">{{ detailData.likes }}</text>
        </view>
        <view class="flex items-center gap-1">
          <view class="i-carbon-chat text-xl text-gray-600"></view>
          <text class="text-sm text-gray-600">{{ detailData.comments }}</text>
        </view>
        <view class="i-carbon-share text-xl text-gray-600"></view>
      </view>
    </view>
  </view>
</template>

<style>
  /* 适配底部安全区 */
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
