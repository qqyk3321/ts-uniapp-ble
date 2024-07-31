<template>
  <view class="card-header"><text>123123123123</text></view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.card-header {
  display: flex; // 使用 Flexbox 布局
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  padding: 10rpx 20rpx; // 内边距：上下10rpx，左右20rpx
  margin: 10rpx 20rpx; // 外边距：上下10rpx，左右20rpx
  min-height: 100rpx; // 最小高度
  border-bottom: 1px solid #eee; // 添加灰色的下边框
  text-align: center; // 文本水平居中（在Flexbox下不是必需的，但可以保留）
  font-weight: bold; // 字体加粗
  font-size: 32rpx; // 设置字体大小，根据实际需要调整
  color: #333; // 设置字体颜色，增加可读性
}
</style>
