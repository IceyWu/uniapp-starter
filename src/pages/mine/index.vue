<script lang="ts" setup>
import SubCom from '@/sub-packages/components/SubCom.vue?async'

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
  </view>
</template>

<style scoped>
.mine-container{
  height: 100%;
}
</style>
