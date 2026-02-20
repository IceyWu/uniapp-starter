<script lang="ts" setup>
import { ref } from "vue";

definePage({
  layout: "custom",
});

const detailData = ref({
  id: 0,
  cover: "",
  title: "",
  desc: "",
  author: "摄影爱好者",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  content:
    "这里是详细内容的展示区域。可以包含更多的文字描述、图片等信息。为了让页面看起来更丰满，这里添加了一些占位文本。",
  likes: 128,
  comments: 32,
});

const navOpacity = ref(0);

onLoad((e: any) => {
  const id = Number(e.id) || 0;
  detailData.value = {
    ...detailData.value,
    id,
    cover: `https://picsum.photos/id/${id}/600/800`,
    title: `title ${id}`,
    desc: `desc ${id} - 这是一个非常精彩的详情描述，展示了更多的细节和内容。`,
  };
});

const handleScroll = (e: any) => {
  const scrollTop = e.detail.scrollTop;
  // 滚动距离在 0-150 之间时，透明度从 0 渐变到 1
  const opacity = Math.min(scrollTop / 150, 1);
  navOpacity.value = opacity;
};
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
              <text class="text-base font-medium text-gray-800">{{
                detailData.author
              }}</text>
            </view>
            <button type="button" class="m-0 px-4 py-1.5 text-sm text-white bg-blue-500 rounded-full border-none leading-normal">关注</button>
          </view>

          <!-- 标题和描述 -->
          <text class="block text-2xl font-bold text-gray-900 mb-2">{{
            detailData.title
          }}</text>
          <text class="block text-base text-gray-500 mb-6 leading-relaxed">{{
            detailData.desc
          }}</text>

          <!-- 正文内容 -->
          <view class="text-gray-700 text-base leading-loose">
            <text>{{ detailData.content }}</text>
            <text class="block mt-4">更多精彩内容，敬请期待...</text>
          </view>

          <!-- 标签 -->
          <view class="flex flex-wrap gap-2 mt-6">
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              ># 摄影</text
            >
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              ># 生活</text
            >
            <text
              class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              ># 随手拍</text
            >
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
