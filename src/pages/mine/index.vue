<script lang="ts" setup>
  import { themePresets } from '@/config/themePresets'
  import SubCom from '~/sub-packages/components/SubCom.vue'

  defineOptions({
    componentPlaceholder: {
      SubCom: 'view',
    },
  })

  definePage(() => ({
    layout: 'default',
    style: {
      navigationBarTitleText: '个人中心',
    },
  }))

  const initLoading = ref(true)
  const subUtils = ref<any>(null)

  async function initSubCom() {
    try {
      initLoading.value = true
      const res = await import('@/sub-packages/utils/subUtils')
      subUtils.value = res
      subUtils.value?.subUtils('🌳-----分包工具函数调用-----')
    } catch (e) {
      console.error('⚠️-----加载子包异常-----', e)
    } finally {
      initLoading.value = false
    }
  }

  // 演示数据
  const switchValue = ref(false)
  const radioValue = ref('1')
  const checkboxValue = ref(['1'])
  const sliderValue = ref(50)
  const inputValue = ref('')
  const rate = ref(3)
  const progress = ref(50)

  // 主题
  const { updateThemeColors, themeColors } = useTheme()
  const currentThemeIndex = ref(0)

  function changeTheme(index: number) {
    currentThemeIndex.value = index
    updateThemeColors(themePresets[index].colors)
    uni.setStorageSync('theme-preset-index', index)
    uni.showToast({
      title: `已切换到${themePresets[index].name}`,
      icon: 'success',
    })
  }

  function handleToast(type: 'success' | 'warning' | 'error' | 'info') {
    uni.showToast({
      title: `${type} 提示`,
      icon: type === 'success' ? 'success' : 'none',
    })
  }

  onMounted(() => {
    initSubCom()
    const saved = uni.getStorageSync('theme-preset-index')
    currentThemeIndex.value =
      saved !== '' && saved != null
        ? saved
        : themePresets.findIndex(
            (p) => p.colors.primary === themeColors.value.primary
          ) || 0
  })
</script>

<template>
  <view class="mine-container">
    <view class="theme-demo">
      <!-- 主题色切换 -->
      <view class="section">
        <view class="section-title">🎨 主题色切换</view>
        <view class="section-desc">预设主题色方案（参考 Arco Design）</view>
        <view class="theme-presets">
          <view
            v-for="(preset, index) in themePresets"
            :key="index"
            class="theme-preset-item"
            :class="{ active: currentThemeIndex === index }"
            @click="changeTheme(index)"
          >
            <view
              class="theme-color-box"
              :style="{ backgroundColor: preset.colors.primary }"
            />
            <view class="theme-name">{{ preset.name }}</view>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-title">主题颜色展示</view>
        <view class="section-desc">切换暗色模式查看效果</view>
      </view>

      <!-- 按钮 -->
      <view class="section">
        <view class="section-title">按钮 Button</view>
        <view class="button-group">
          <wd-button type="primary"> 主要按钮 </wd-button>
          <wd-button type="success"> 成功按钮 </wd-button>
          <wd-button type="warning"> 警告按钮 </wd-button>
          <wd-button type="danger"> 危险按钮 </wd-button>
          <wd-button type="info"> 信息按钮 </wd-button>
          <wd-button variant="plain" type="primary"> 镂空按钮 </wd-button>
        </view>
      </view>

      <!-- 标签 -->
      <view class="section">
        <view class="section-title">标签 Tag</view>
        <view class="tag-group">
          <wd-tag type="primary"> 主要标签 </wd-tag>
          <wd-tag type="success"> 成功标签 </wd-tag>
          <wd-tag type="warning"> 警告标签 </wd-tag>
          <wd-tag type="danger"> 危险标签 </wd-tag>
        </view>
      </view>

      <!-- 徽标 -->
      <view class="section">
        <view class="section-title">徽标 Badge</view>
        <view class="badge-group">
          <wd-badge value="8" type="primary">
            <wd-button size="small"> 主要 </wd-button>
          </wd-badge>
          <wd-badge value="5" type="success">
            <wd-button size="small"> 成功 </wd-button>
          </wd-badge>
          <wd-badge value="99+" type="warning">
            <wd-button size="small"> 警告 </wd-button>
          </wd-badge>
          <wd-badge value="New" type="danger">
            <wd-button size="small"> 危险 </wd-button>
          </wd-badge>
        </view>
      </view>

      <!-- 开关 -->
      <view class="section">
        <view class="section-title">开关 Switch</view>
        <wd-cell title="开关状态">
          <wd-switch v-model="switchValue" />
        </wd-cell>
      </view>

      <!-- 单选框 -->
      <view class="section">
        <view class="section-title">单选框 Radio</view>
        <wd-radio-group v-model="radioValue">
          <wd-radio value="1"> 选项一 </wd-radio>
          <wd-radio value="2"> 选项二 </wd-radio>
          <wd-radio value="3"> 选项三 </wd-radio>
        </wd-radio-group>
      </view>

      <!-- 复选框 -->
      <view class="section">
        <view class="section-title">复选框 Checkbox</view>
        <wd-checkbox-group v-model="checkboxValue">
          <wd-checkbox name="1"> 选项一 </wd-checkbox>
          <wd-checkbox name="2"> 选项二 </wd-checkbox>
          <wd-checkbox name="3"> 选项三 </wd-checkbox>
        </wd-checkbox-group>
      </view>

      <!-- 输入框 -->
      <view class="section">
        <view class="section-title">输入框 Input</view>
        <wd-input v-model="inputValue" placeholder="请输入内容" clearable />
      </view>

      <!-- 滑块 -->
      <view class="section">
        <view class="section-title">滑块 Slider ({{ sliderValue }})</view>
        <wd-slider v-model="sliderValue" />
      </view>

      <!-- 评分 -->
      <view class="section">
        <view class="section-title">评分 Rate</view>
        <wd-rate v-model="rate" />
      </view>

      <!-- 进度条 -->
      <view class="section">
        <view class="section-title">进度条 Progress</view>
        <wd-progress :percentage="progress" />
        <wd-progress :percentage="progress" status="success" />
        <wd-progress :percentage="progress" status="warning" />
        <wd-progress :percentage="progress" status="danger" />
      </view>

      <!-- 消息提示 -->
      <view class="section">
        <view class="section-title">消息提示</view>
        <view class="button-group">
          <wd-button size="small" @click="handleToast('success')">
            成功提示
          </wd-button>
          <wd-button size="small" @click="handleToast('warning')">
            警告提示
          </wd-button>
          <wd-button size="small" @click="handleToast('error')">
            错误提示
          </wd-button>
          <wd-button size="small" @click="handleToast('info')">
            信息提示
          </wd-button>
        </view>
      </view>

      <!-- 单元格 -->
      <view class="section">
        <view class="section-title">单元格 Cell</view>
        <wd-cell-group>
          <wd-cell title="单元格" value="内容" />
          <wd-cell title="带图标" value="内容" prefix-icon="setting" />
          <wd-cell title="可点击" is-link value="详情" />
          <wd-cell title="带标签">
            <wd-tag type="primary"> 标签 </wd-tag>
          </wd-cell>
        </wd-cell-group>
      </view>

      <!-- 分隔符 -->
      <view class="section">
        <view class="section-title">分隔符 Divider</view>
        <wd-divider>默认分割线</wd-divider>
        <wd-divider content-position="left"> 左侧文字 </wd-divider>
        <wd-divider content-position="right"> 右侧文字 </wd-divider>
      </view>

      <!-- 子包组件 -->
      <view class="section">
        <view class="section-title">子包组件</view>
        <wd-loading v-if="initLoading">子包加载中...</wd-loading>
        <SubCom v-else />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mine-container {
  min-height: 100%;
  padding-bottom: 40rpx;
  background-color: var(--wot-filled-bottom, #f7f8fa);
}

.theme-demo {
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: var(--wot-filled-oppo, #ffffff);
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx var(--wot-opac-2_04, rgba(0, 0, 0, 0.04));

  &-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--wot-text-main, #1d2129);
    margin-bottom: 20rpx;
  }

  &-desc {
    font-size: 28rpx;
    color: var(--wot-text-secondary, #4e5969);
    margin-bottom: 20rpx;
  }
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;

  :deep(.wd-button) {
    flex: 0 0 calc(50% - 10rpx);
  }
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.badge-group {
  display: flex;
  gap: 30rpx;
  flex-wrap: wrap;
}

.theme-presets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
}

.theme-preset-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  border-radius: 12rpx;
  background-color: var(--wot-filled-content, #f2f3f5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2rpx solid transparent;

  &.active {
    border-color: var(--wot-primary-6, #165DFF);
    background-color: var(--wot-feedback-accent, rgba(22, 93, 255, 0.1));
  }

  &:active {
    transform: scale(0.95);
  }
}

.theme-color-box {
  width: 60rpx;
  height: 60rpx;
  border-radius: 12rpx;
  margin-bottom: 12rpx;
  box-shadow: 0 4rpx 12rpx var(--wot-opac-3_08, rgba(0, 0, 0, 0.08));
}

.theme-name {
  font-size: 24rpx;
  color: var(--wot-text-main, #1d2129);
  text-align: center;
  white-space: nowrap;
}
</style>
