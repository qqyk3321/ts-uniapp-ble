<template>
  <view class="card-container">
    <uni-card is-shadow is-full>
      <template v-slot:title>
        <!-- 正确使用命名插槽 "title" -->
        <bleCardHeader />
      </template>
      <bleCardBody />
      <!-- 默认插槽中的内容 -->
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ensureAllPermissionsGranted } from '@/utils/basicOption/permission'
import bleCardBody from './components/bleCardBody/index.vue'
import bleCardHeader from './components/bleCardHeader/index.vue'
onLoad(async () => {
  console.log('weixinyemian 1111')
  const res = await ensureAllPermissionsGranted()
  console.log('BLE页面权限获取成功', res)
})
console.log('weixinyemian ')
</script>

<style lang="scss" scoped>
.card-container {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;

  .card {
    .uni-card--full {
      border-radius: 16rpx !important;
    }
  }
}
</style>
