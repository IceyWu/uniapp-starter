<script setup lang="ts">
interface WaterfallsListProps {
  autoLoad?: boolean
}
const props = defineProps<WaterfallsListProps>()

// 模拟api
async function getTestApi(params: any) {
  await sleep(500)
  const { page = 0, size = 10, maxPage = 3 } = params
  const baseSize = page * size
  const data = list(0, size - 1, (index) => {
    const element = baseSize + index
    const coverSize = 200 + Math.floor(Math.random() * 100)
    const coverHeight = 300 + Math.floor(Math.random() * 100)
    const coverUrl = `https://picsum.photos/id/${element}/${coverSize}/${coverHeight}`
    return {
      id: element,
      cover: coverUrl,
      title: `title ${element}`,
      desc: `desc ${element}`,
      height: coverHeight,
      width: coverSize,
    }
  })
  return {
    code: 200,
    msg: '查询成功',
    result: {
      content: data,
      last: page + 1 === maxPage,
      total: 100,
    },
  }
}

const pagingRef = ref()
// 标记当前是刷新还是加载更多
const isRefreshing = ref(false)

const {
  onRefresh,
  onLoad: onLoadMore,
  result,
} = useRequest(getTestApi, {
  target: 'list',
  loadingDelay: 300,
  getVal: (res) => {
    return getObjVal(res, 'result.content', [])
  },
  listOptions: {
    defaultPageKey: 'page',
    defaultSizeKey: 'size',
    defaultDataKey: 'list',
    defaultPage: 0,
    getTotal: (data) => {
      return getObjVal(data, 'result.total', 0)
    },
  },
  onRequestEnd: () => {
    const list = getObjVal(result.value, 'list', [])
    const finished = getObjVal(result.value, 'finished', false)
    if (isRefreshing.value) {
      // 刷新：传完整列表
      pagingRef.value?.complete(list)
    }
    else {
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
  }
  else {
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
  if (scrollTimer)
    return
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
                <view class="h-full w-full fcc flex items-center justify-center card-base">
                  <text class="text-gray-400">
                    图片加载失败
                  </text>
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
  </z-paging>
</template>

<style scoped lang="scss">
.item-img {
  min-height: 50rpx;
}
</style>
