<script setup lang="ts">
const data = {
  imageSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG',
  videoSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965199299.MOV',
}
</script>

<template>
  <view class="test-page">
    <view class="test-container">
      <text class="title">
        实况预览组件测试
      </text>
      <view class="live-photo-wrapper">
        <live-photo
          :image-src="data.imageSrc"
          :video-src="data.videoSrc"
        />
      </view>

      <view class="instructions">
        <text class="instruction-text">
          长按图片查看实况效果
        </text>
        <text class="instruction-text">
          手指释放时会立即回到静态图片
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.test-page {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.test-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.live-photo-wrapper {
  width: 300px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.instructions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.instruction-text {
  font-size: 14px;
  color: #666;  text-align: center;
}
</style>
