<template>
  <uni-collapse-item>
    <view class="content">
      //TODO 上面是要去渲染的
      <text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
    </view>
  </uni-collapse-item>
</template>

<script lang="ts" setup>
// 引入接口定义（确保路径和文件名正确）
import { computed } from 'vue'
const props = defineProps({
  logItem: {
    type: Object as () => logItemInterface,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
// 颜色映射
const logItemColors: logItemColorMapping = {
  BLE: { receive: '#6C8EAD', send: '#3B576D' },
  SER: { receive: '#D8A860', send: '#A07840' },
  SES: { receive: '#A48EB2', send: '#6B597A' },
}
// 使用 computed 定义 showLogItem，以确保响应性
const showLogItem = computed<showLogItemInterface>(() => ({
  ...props.logItem,
  color: logItemColors[props.logItem.type][props.logItem.direction], // 根据 type 和 direction 设置颜色
  levelColor: props.logItem.level === 'success' ? '#6A8E6A' : '#9E5A5A', // 设置成功或失败的颜色
  indexColor: '#808080', // 设置灰色索引颜色
}))
</script>

<style lang="scss" scoped></style>
