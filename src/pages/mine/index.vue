<script lang="ts" setup>
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

  // 子包组件初始化
  async function initSubCom() {
    try {
      initLoading.value = true
      console.log('🦄首页-开始加载子包------------------------------>')
      // await AsyncImport('@/sub-packages/components/SubCom.vue')
      await import('@/sub-packages/utils/subUtils').then((res) => {
        console.log('分包异步工具函数加载----->', res)
        subUtils.value = res
      })
      subUtils.value?.subUtils('🌳-----分包工具函数调用-----')
    } catch (e) {
      console.error('⚠️-----首页-加载子包异常-----', e)
    } finally {
      console.log('🦄首页-结束加载子包------------------------------>')
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

  // 主题色配置
  const { updateThemeColors, themeColors } = useTheme()

  // 预设主题色方案 (参考 Arco Design)
  const themePresets = [
    {
      name: '默认蓝',
      colors: {
        primary: '#165DFF',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '极客蓝',
      colors: {
        primary: '#3491FA',
        success: '#23C343',
        warning: '#F7B500',
        danger: '#F5222D',
        info: '#909399',
      },
    },
    {
      name: '薄暮橙',
      colors: {
        primary: '#F77234',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '日暮黄',
      colors: {
        primary: '#F7BA1E',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '明青',
      colors: {
        primary: '#14C9C9',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '极光绿',
      colors: {
        primary: '#00B42A',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '酱紫',
      colors: {
        primary: '#722ED1',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
    {
      name: '品红',
      colors: {
        primary: '#D91AD9',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        info: '#86909C',
      },
    },
  ]

  // 当前选中的主题索引
  const currentThemeIndex = ref(0)

  // 根据当前主题色查找匹配的预设索引
  function findThemeIndex() {
    const current = themeColors.value
    const index = themePresets.findIndex(
      (preset) => preset.colors.primary === current.primary
    )
    return index >= 0 ? index : 0
  }

  // 切换主题
  function changeTheme(index: number) {
    currentThemeIndex.value = index
    const theme = themePresets[index]
    updateThemeColors(theme.colors)
    // 保存主题索引
    uni.setStorageSync('theme-preset-index', index)
    uni.showToast({
      title: `已切换到${theme.name}`,
      icon: 'success',
    })
  }

  // Toast 消息
  function handleToast(type: 'success' | 'warning' | 'error' | 'info') {
    uni.showToast({
      title: `${type} 提示`,
      icon: type === 'success' ? 'success' : 'none',
    })
  }

  onMounted(() => {
    initSubCom()

    // 恢复上次选中的主题索引
    const savedIndex = uni.getStorageSync('theme-preset-index')
    if (savedIndex !== undefined && savedIndex !== null && savedIndex !== '') {
      currentThemeIndex.value = savedIndex
    } else {
      // 如果没有保存的索引，尝试根据当前主题色查找匹配的预设
      currentThemeIndex.value = findThemeIndex()
    }
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

      <!-- 标题 -->
      <view class="section">
        <view class="section-title">主题颜色展示</view>
        <view class="section-desc">切换暗色模式查看效果</view>
      </view>

      <!-- 按钮 Buttons -->
      <view class="section">
        <view class="section-title">按钮 Button</view>
        <view class="button-group">
          <wd-button type="primary"> 主要按钮 </wd-button>
          <wd-button type="success"> 成功按钮 </wd-button>
          <wd-button type="warning"> 警告按钮 </wd-button>
          <wd-button type="error"> 危险按钮 </wd-button>
          <wd-button type="info"> 信息按钮 </wd-button>
          <wd-button plain type="primary"> 镂空按钮 </wd-button>
        </view>
      </view>

      <!-- 标签 Tag -->
      <view class="section">
        <view class="section-title">标签 Tag</view>
        <view class="tag-group">
          <wd-tag type="primary"> 主要标签 </wd-tag>
          <wd-tag type="success"> 成功标签 </wd-tag>
          <wd-tag type="warning"> 警告标签 </wd-tag>
          <wd-tag type="danger"> 危险标签 </wd-tag>
        </view>
      </view>

      <!-- 徽标 Badge -->
      <view class="section">
        <view class="section-title">徽标 Badge</view>
        <view class="badge-group">
          <wd-badge model-value="8" type="primary">
            <wd-button size="small"> 主要 </wd-button>
          </wd-badge>
          <wd-badge model-value="5" type="success">
            <wd-button size="small"> 成功 </wd-button>
          </wd-badge>
          <wd-badge model-value="99+" type="warning">
            <wd-button size="small"> 警告 </wd-button>
          </wd-badge>
          <wd-badge model-value="New" type="danger">
            <wd-button size="small"> 危险 </wd-button>
          </wd-badge>
        </view>
      </view>

      <!-- 开关 Switch -->
      <view class="section">
        <view class="section-title">开关 Switch</view>
        <view class="switch-group">
          <wd-cell title="开关状态">
            <wd-switch v-model="switchValue" />
          </wd-cell>
        </view>
      </view>

      <!-- 单选框 Radio -->
      <view class="section">
        <view class="section-title">单选框 Radio</view>
        <wd-radio-group v-model="radioValue">
          <wd-radio value="1"> 选项一 </wd-radio>
          <wd-radio value="2"> 选项二 </wd-radio>
          <wd-radio value="3"> 选项三 </wd-radio>
        </wd-radio-group>
      </view>

      <!-- 复选框 Checkbox -->
      <view class="section">
        <view class="section-title">复选框 Checkbox</view>
        <wd-checkbox-group v-model="checkboxValue">
          <wd-checkbox value="1"> 选项一 </wd-checkbox>
          <wd-checkbox value="2"> 选项二 </wd-checkbox>
          <wd-checkbox value="3"> 选项三 </wd-checkbox>
        </wd-checkbox-group>
      </view>

      <!-- 输入框 Input -->
      <view class="section">
        <view class="section-title">输入框 Input</view>
        <wd-input v-model="inputValue" placeholder="请输入内容" clearable />
      </view>

      <!-- 滑块 Slider -->
      <view class="section">
        <view class="section-title">滑块 Slider ({{ sliderValue }})</view>
        <wd-slider v-model="sliderValue" />
      </view>

      <!-- 评分 Rate -->
      <view class="section">
        <view class="section-title">评分 Rate</view>
        <wd-rate v-model="rate" />
      </view>

      <!-- 进度条 Progress -->
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

      <!-- 单元格 Cell -->
      <view class="section">
        <view class="section-title">单元格 Cell</view>
        <wd-cell-group>
          <wd-cell title="单元格" value="内容" />
          <wd-cell title="带图标" value="内容" icon="setting" />
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
        <template v-if="initLoading">
          <wd-loading>子包加载中...</wd-loading>
        </template>
        <template v-else> <SubCom /> </template>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mine-container {
  min-height: 100%;
  padding-bottom: 40rpx;
  background-color: #f7f8fa; // 浅色模式背景
}

.theme-demo {
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);

  &-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1d2129; // Arco 主要文字色
    margin-bottom: 20rpx;
  }

  &-desc {
    font-size: 28rpx;
    color: #4e5969; // Arco 次要文字色
    margin-bottom: 20rpx;
  }
}

// 深色模式适配 - 参考 Arco Design
.dark {
  .mine-container {
    background-color: #17171a; // Arco 深色背景色
  }

  .section {
    background-color: #232324; // Arco 深色容器背景
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.4);
  }

  .section-title {
    color: #e5e6eb; // Arco 深色主要文字
  }

  .section-desc {
    color: #86909c; // Arco 深色次要文字
  }

  .theme-preset-item {
    background-color: rgba(255, 255, 255, 0.08);

    &.active {
      background-color: var(--wot-color-theme-light-9, rgba(22, 93, 255, 0.15));
      border-color: var(--wot-color-theme, #165DFF);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.12);
    }
  }

  .theme-name {
    color: #c9cdd4; // Arco 深色常规文字
  }

  .theme-color-box {
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
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

.switch-group {
  :deep(.wd-cell) {
    padding: 0;
  }
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
  background-color: #f2f3f5; // Arco 浅色背景
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2rpx solid transparent;

  &.active {
    border-color: var(--wot-color-theme, #165DFF);
    background-color: var(--wot-color-theme-light-9, rgba(22, 93, 255, 0.1));
  }

  &:hover {
    background-color: #e5e6eb;
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
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.theme-name {
  font-size: 24rpx;
  color: #1d2129; // Arco 主要文字色
  text-align: center;
  white-space: nowrap;
}
</style>
