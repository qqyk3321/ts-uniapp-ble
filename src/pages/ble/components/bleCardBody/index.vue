<template>
  <view class="card-body-container"> <startBleButton /> </view>
</template>

<script lang="ts" setup>
import startBleButton from './startBleButton/index.vue'
</script>

<style lang="scss" scoped>
.card-body-container {
  display: flex; // 使用 Flexbox 布局
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  min-height: 500rpx;
}
</style>
