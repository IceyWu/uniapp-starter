<script lang="ts" setup>
import SubCom from '~/sub-packages/components/SubCom.vue?async'

definePage(() => {
  return {
    layout: 'default',
    style: {
      navigationBarTitleText: '个人中心',
    },
  }
})

const initLoading = ref(true)
const subUtils = ref<any>(null)

// 子包组件初始化
async function initSubCom() {
  try {
    initLoading.value = true
    console.log('🦄首页-开始加载子包------------------------------>')
    await AsyncImport('@/sub-packages/components/SubCom.vue')
    await AsyncImport('@/sub-packages/utils/subUtils').then((res) => {
      console.log('分包异步工具函数加载----->', res)
      subUtils.value = res
    })
    subUtils.value?.subUtils('🌳-----分包工具函数调用-----')
  }
  catch (e) {
    console.error('⚠️-----首页-加载子包异常-----', e)
  }
  finally {
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
const showToast = ref(false)

// Toast 消息
function handleToast(type: 'success' | 'warning' | 'error' | 'info') {
  uni.showToast({
    title: `${type} 提示`,
    icon: type === 'success' ? 'success' : 'none',
  })
}

onMounted(() => {
  initSubCom()
})
</script>

<template>
  <view class="mine-container">
    <template v-if="initLoading">
      子包加载中...
    </template>
    <template v-else>
      <SubCom />
    </template>
    <view class="theme-demo">
      <!-- 标题 -->
      <view class="section">
        <view class="section-title">
          主题颜色展示
        </view>
        <view class="section-desc">
          切换暗色模式查看效果
        </view>
      </view>

      <!-- 按钮 Buttons -->
      <view class="section">
        <view class="section-title">
          按钮 Button
        </view>
        <view class="button-group">
          <wd-button type="primary">
            主要按钮
          </wd-button>
          <wd-button type="success">
            成功按钮
          </wd-button>
          <wd-button type="warning">
            警告按钮
          </wd-button>
          <wd-button type="error">
            危险按钮
          </wd-button>
          <wd-button type="info">
            信息按钮
          </wd-button>
          <wd-button plain type="primary">
            镂空按钮
          </wd-button>
        </view>
      </view>

      <!-- 标签 Tag -->
      <view class="section">
        <view class="section-title">
          标签 Tag
        </view>
        <view class="tag-group">
          <wd-tag type="primary">
            主要标签
          </wd-tag>
          <wd-tag type="success">
            成功标签
          </wd-tag>
          <wd-tag type="warning">
            警告标签
          </wd-tag>
          <wd-tag type="danger">
            危险标签
          </wd-tag>
          <wd-tag type="info">
            信息标签
          </wd-tag>
        </view>
      </view>

      <!-- 徽标 Badge -->
      <view class="section">
        <view class="section-title">
          徽标 Badge
        </view>
        <view class="badge-group">
          <wd-badge model-value="8" type="primary">
            <wd-button size="small">
              主要
            </wd-button>
          </wd-badge>
          <wd-badge model-value="5" type="success">
            <wd-button size="small">
              成功
            </wd-button>
          </wd-badge>
          <wd-badge model-value="99+" type="warning">
            <wd-button size="small">
              警告
            </wd-button>
          </wd-badge>
          <wd-badge model-value="New" type="danger">
            <wd-button size="small">
              危险
            </wd-button>
          </wd-badge>
        </view>
      </view>

      <!-- 开关 Switch -->
      <view class="section">
        <view class="section-title">
          开关 Switch
        </view>
        <view class="switch-group">
          <wd-cell title="开关状态">
            <wd-switch v-model="switchValue" />
          </wd-cell>
        </view>
      </view>

      <!-- 单选框 Radio -->
      <view class="section">
        <view class="section-title">
          单选框 Radio
        </view>
        <wd-radio-group v-model="radioValue">
          <wd-radio value="1">
            选项一
          </wd-radio>
          <wd-radio value="2">
            选项二
          </wd-radio>
          <wd-radio value="3">
            选项三
          </wd-radio>
        </wd-radio-group>
      </view>

      <!-- 复选框 Checkbox -->
      <view class="section">
        <view class="section-title">
          复选框 Checkbox
        </view>
        <wd-checkbox-group v-model="checkboxValue">
          <wd-checkbox value="1">
            选项一
          </wd-checkbox>
          <wd-checkbox value="2">
            选项二
          </wd-checkbox>
          <wd-checkbox value="3">
            选项三
          </wd-checkbox>
        </wd-checkbox-group>
      </view>

      <!-- 输入框 Input -->
      <view class="section">
        <view class="section-title">
          输入框 Input
        </view>
        <wd-input v-model="inputValue" placeholder="请输入内容" clearable />
      </view>

      <!-- 滑块 Slider -->
      <view class="section">
        <view class="section-title">
          滑块 Slider ({{ sliderValue }})
        </view>
        <wd-slider v-model="sliderValue" />
      </view>

      <!-- 评分 Rate -->
      <view class="section">
        <view class="section-title">
          评分 Rate
        </view>
        <wd-rate v-model="rate" />
      </view>

      <!-- 进度条 Progress -->
      <view class="section">
        <view class="section-title">
          进度条 Progress
        </view>
        <wd-progress :percentage="progress" />
        <wd-progress :percentage="progress" status="success" />
        <wd-progress :percentage="progress" status="warning" />
        <wd-progress :percentage="progress" status="danger" />
      </view>

      <!-- 消息提示 -->
      <view class="section">
        <view class="section-title">
          消息提示
        </view>
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
        <view class="section-title">
          单元格 Cell
        </view>
        <wd-cell-group>
          <wd-cell title="单元格" value="内容" />
          <wd-cell title="带图标" value="内容" icon="setting" />
          <wd-cell title="可点击" is-link value="详情" />
          <wd-cell title="带标签">
            <wd-tag type="primary">
              标签
            </wd-tag>
          </wd-cell>
        </wd-cell-group>
      </view>

      <!-- 分隔符 -->
      <view class="section">
        <view class="section-title">
          分隔符 Divider
        </view>
        <wd-divider>默认分割线</wd-divider>
        <wd-divider content-position="left">
          左侧文字
        </wd-divider>
        <wd-divider content-position="right">
          右侧文字
        </wd-divider>
      </view>

      <!-- 子包组件 -->
      <view class="section">
        <view class="section-title">
          子包组件
        </view>
        <template v-if="initLoading">
          <wd-loading>子包加载中...</wd-loading>
        </template>
        <template v-else>
          <SubCom />
        </template>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mine-container {
  min-height: 100%;
  background-color: var(--wot-bg-color-page, #f5f5f5);
  padding-bottom: 40rpx;
}

.theme-demo {
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: var(--wot-bg-color-container, #ffffff);
  border-radius: 16rpx;
  padding: 30rpx;

  &-title {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--wot-color-text, rgba(0, 0, 0, 0.85));
    margin-bottom: 20rpx;
  }

  &-desc {
    font-size: 28rpx;
    color: var(--wot-color-text-secondary, rgba(0, 0, 0, 0.45));
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

.switch-group {
  :deep(.wd-cell) {
    padding: 0;
  }
}
</style>
