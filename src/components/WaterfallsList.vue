<script setup lang="ts">
  import { getPicsumList } from '@/api/apiPicsum'

  interface WaterfallsListProps {
    autoLoad?: boolean
  }
  const props = defineProps<WaterfallsListProps>()

  // 骨架屏：模拟瀑布流卡片形状（图片 + 标题 + 描述）
  const skeletonRowCol = [
    { height: '180px', borderRadius: '12px' },
    { width: '70%', height: '16px', margin: '10px 10px 0' },
    { width: '50%', height: '12px', margin: '8px 10px 0' },
  ]

  const pagingRef = ref()
  // 标记当前是刷新还是加载更多
  const isRefreshing = ref(false)

  const {
    onRefresh,
    onLoad: onLoadMore,
    result,
  } = useRequest(getPicsumList, {
    target: 'list',
    loadingDelay: 300,
    getVal: (res: any) => {
      return (res || []).map((item: any) => ({
        id: item.id,
        cover: item.download_url,
        title: item.author,
        desc: `Photo #${item.id} · ${item.width}×${item.height}`,
        height: item.height,
        width: item.width,
      }))
    },
    listOptions: {
      defaultPageKey: 'page',
      defaultSizeKey: 'limit',
      defaultDataKey: 'list',
      defaultPage: 1,
    },
    onRequestEnd: () => {
      const list = getObjVal(result.value, 'list', [])
      const finished = getObjVal(result.value, 'finished', false)
      if (isRefreshing.value) {
        // 刷新：传完整列表
        pagingRef.value?.complete(list)
      } else {
        // 加载更多：只传本次新增的数据，z-paging 会自动追加
        pagingRef.value?.complete(list)
      }
      if (finished) {
        pagingRef.value?.complete([])
      }
    },
  })

  // z-paging 的 @query 回调，pageNo 从 1 开始
  function queryList(pageNo: number) {
    isRefreshing.value = pageNo === 1
    if (pageNo === 1) {
      onRefresh()
    } else {
      onLoadMore()
    }
  }

  function handleItemClick(data: any) {
    uni.navigateTo({
      url: `/pages/home/detail?id=${data.id}`,
    })
  }

  function getImgInfo(width: number, height: number) {
    const screenWidth = uni.getWindowInfo().screenWidth
    const rpxWidth = (screenWidth / 750) * 690
    const imgHeight = (height / width) * rpxWidth
    return {
      width: '100%',
      height: imgHeight / 2,
    }
  }

  let scrollTimer: any = null
  function handleScroll(e: any) {
    if (scrollTimer) return
    scrollTimer = setTimeout(() => {
      uni.$emit('pageScroll', e.detail.scrollTop)
      scrollTimer = null
    }, 16)
  }

  onMounted(() => {
    if (props.autoLoad) {
      pagingRef.value?.reload()
    }
  })

  defineExpose({
    reload: () => pagingRef.value?.reload(),
    refresh: () => pagingRef.value?.refresh(),
  })
</script>

<template>
  <z-paging
    ref="pagingRef"
    :fixed="false"
    @query="queryList"
    @scroll="handleScroll"
  >
    <view class="px-3 pt-2">
      <up-waterfall
        :list="getObjVal(result, 'list', [])"
        :column="2"
        @item-click="handleItemClick"
      >
        <template #default="{ item, onLoad, onError }">
          <div class="card-base">
            <UpImage
              :src="item.cover"
              mode="widthFix"
              :height="getImgInfo(item.width, item.height).height"
              :width="getImgInfo(item.width, item.height)?.width"
              @load="onLoad"
              @error="onError"
            >
              <template #error>
                <view
                  class="h-full w-full fcc flex items-center justify-center card-base"
                >
                  <text class="text-gray-400">图片加载失败</text>
                </view>
              </template>
              <template #loading>
                <view class="h-full w-full fcc card-base" />
              </template>
            </UpImage>
            <text class="line-clamp-2 px-2 text-left text-base">
              {{ item?.title }}
            </text>
            <text class="line-clamp-3 px-2 pb-2 text-sm text-gray-500">
              {{ item?.desc }}
            </text>
          </div>
        </template>
      </up-waterfall>
    </view>

    <!-- 底部加载骨架屏 -->
    <template #loadingMoreLoading>
      <view class="skeleton-wrap">
        <wd-skeleton
          v-for="i in 2"
          :key="i"
          animation="gradient"
          :row-col="skeletonRowCol"
          :custom-style="{ flex: 1 }"
        />
      </view>
    </template>
  </z-paging>
</template>

<style scoped lang="scss">
.skeleton-wrap {
  display: flex;
  gap: 12px;
  padding: 12px;
}
</style>
