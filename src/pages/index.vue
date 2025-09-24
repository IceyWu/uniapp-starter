<script setup lang="ts">
definePage(() => {
  return {
    layout: 'home',
  }
})

const scrollH = ref(500)

onShow(() => {})
onLoad(() => {
  uni.getSystemInfo({
    success: (res: any) => {
      scrollH.value = res.windowHeight - res.statusBarHeight - 44
    },
  })
})
</script>

<template>
  <view class="content-box">
    <NavBar
      :base-props="{
        fixed: false,
        border: false,
      }"
    >
      <template #left>
        <view>推荐</view>
      </template>
    </NavBar>
    <div class="main-content">
      <WaterfallsList auto-load />
    </div>
  </view>
</template>

<style scoped lang="scss">
//  隐藏滚动条
::-webkit-scrollbar {
  display: none;
}

scroll-view ::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

.content-box {
  // height: calc(100vh - 104rpx);
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20rpx 26rpx;
  // padding-bottom: 0;
  overflow: auto;

  .main-content {
    height: 100%;
    // flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    // margin: 5px 10px;

    .scroll-view-tag {
      padding: 10px 5px;
      box-sizing: border-box;
      width: 100%;

      ::-webkit-scrollbar {
        display: none;
      }

      .scroll-view-content {
        display: flex;
        flex-direction: row;

        .scroll-view-item {
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;

          padding: 0 6px;
          font-size: 15px;
          color: rgba(51, 51, 51, 0.6);

          &.active {
            color: #333;
            font-weight: bold;
          }
        }
      }
    }

    .con-list {
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;

      .list-item-content {
        padding: 5px;

        .list-item-content-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }

        .list-item-content-desc {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}

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
