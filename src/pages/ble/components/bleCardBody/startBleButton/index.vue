<template>
  <button class="custom-btn" @click="startBle">开启蓝牙连接</button>
</template>

<script lang="ts" setup>
const startBle = () => {
  //接下来就是开启蓝牙
}
</script>

<style lang="scss" scoped>
.custom-btn {
  background-color: #4caf50; // 按钮背景颜色
  color: white; // 文字颜色
  border-radius: 8px; // 圆角大小
  padding: 12px 24px; // 内边距
  font-size: 18px; // 字体大小
  border: none; // 无边框
  outline: none; // 去除焦点时的轮廓
  box-shadow: 0 4px #999; // 添加阴影
}
.custom-btn:active {
  background-color: #3e8e41;
  box-shadow: 0 2px #666;
  transform: translateY(2px);
}
</style>
