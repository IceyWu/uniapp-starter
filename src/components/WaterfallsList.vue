<script setup lang="ts">
interface WaterfallsListProps {
  autoLoad?: boolean
}
const props = defineProps<WaterfallsListProps>()
// 模拟api
async function getTestApi(params) {
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

const scrollListRef = ref()
const {
  search,
  onRefresh,
  onLoad: onLoadMore,
  result,
} = useRequest(getTestApi, {
  target: 'list',
  loadingDelay: 300,
  getVal: (res) => {
    const list = getObjVal(res, 'result.content', [])

    return list
  },
  listOptions: {
    defaultPageKey: 'page',
    defaultSizeKey: 'size',
    defaultDataKey: 'list',
    defaultPage: 0,
    getTotal: (data) => {
      const total = getObjVal(data, 'result.total', 0)
      return total
    },
  },
  onRequestEnd: (res) => {
    if (scrollListRef.value) {
      scrollListRef.value?.stopRefresh()
    }
  },
})

function handleItemClick(data: any) {
  uni.navigateTo({
    url: `/pages/home/detail?id=${data.id}`,
  })
}

function getCoverObj(data: any) {
  const files = data?.fileList || []
  return arrayFirst(files, {})
}
function init() {
  if (!props.autoLoad) {
    return
  }

  onRefresh()
}
onMounted(() => {
  init()
})

defineExpose({
  onLoadMore,
})
</script>

<template>
  <up-list
    ref="scrollListRef"
    v-model:list-obj="result"
    :scroll-view-props="{
      refresherEnabled: false,
      scrollY: true,
    }"
    @on-load="onLoadMore"
    @on-refresh="onRefresh"
  >
    <template #default="{ data: { list } }">
      <view class="px-3 pt-2">
        <up-waterfall
          :list="list"
          :column="2"
          @item-click="handleItemClick"
        >
          <template #default="{ item, onLoad, onError }">
            <UpImage
              :src="item.cover"
              mode="widthFix"
              height="100%"
              width="100%"
              @load="onLoad"
              @error="onError"
            />
            <text class="line-clamp-2 px-2 text-left text-base">
              {{ item?.title }}
            </text>
            <text class="line-clamp-3 px-2 pb-2 text-sm text-gray-500">
              {{ item?.desc }}
            </text>
          </template>
        </up-waterfall>
      </view>
    </template>
  </up-list>
</template>

<style scoped lang="scss">
.item-img {
  min-height: 50rpx;
}

.item-info {
  display: flex;
  align-items: center;
  padding: 30rpx 20rpx;
  padding-top: 10rpx;
  box-sizing: border-box;

  .info-avatar {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .info-nickname {
    font-size: 12px;
    color: #333;
  }
}
</style>
