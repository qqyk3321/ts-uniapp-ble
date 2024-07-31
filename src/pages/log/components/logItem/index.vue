<template>
  <uni-collapse-item>
    <!-- 命名插槽 'title' -->
    <template v-slot:title>
      <view class="title-container">
        <!-- 左侧内容区 -->
        <view class="left-content">
          <!-- 序号，使用uni-tag展示，样式为灰色 -->
          <uni-tag
            type="default"
            :text="indexShow"
            :inverted="true"
            style="background-color: #ccc"
          ></uni-tag>
          <!-- 日志级别和名称，垂直排列 -->
          <view class="log-info">
            <view
              ><uni-tag
                size="small"
                :text="showLogItem.level"
                :custom-style="`background-color: ${showLogItem.levelColor};border-color:${showLogItem.levelColor};  color: #fff;`"
              >
              </uni-tag
              ><uni-tag
                size="small"
                :text="`${showLogItem.type} - ${showLogItem.direction}`"
                :custom-style="`margin-left:10rpx; background-color: ${showLogItem.color}; border-color: ${showLogItem.color}; color: #fff;`"
              >
              </uni-tag
            ></view>
            <!-- <text class="log-title"
              >{{ showLogItem.level }} {{ showLogItem.type }} - {{ showLogItem.direction }}</text
            > -->
            <text class="log-label">{{ showLogItem.label }}</text>
          </view>
        </view>

        <!-- 右侧时间显示 -->
        <uni-dateformat
          :date="showLogItem.time"
          class="log-time"
          format="hh:mm:ss"
        ></uni-dateformat>
        <!-- <text >{{ showLogItem.time }}</text> -->
      </view>
    </template>

    <!-- 默认插槽内容 -->
    <view>
      <text>{{ showLogItem.value }}</text>
    </view>
  </uni-collapse-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type {
  logItemInterface,
  logItemColorMapping,
  showLogItemInterface,
} from '../../../../types/log/logItem'
// 定义组件的属性
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    type: Object as () => logItemInterface,
    required: true,
  },
})

// 计算属性，用于显示处理后的 index
const indexShow = computed(() => {
  // 将 index + 1 计算后的结果转换为字符串，并确保至少两位数显示
  return (props.index + 1).toString().padStart(2, '0')
})

// 颜色映射
const logItemColors: logItemColorMapping = {
  BLE: { receive: '#6C8EAD', send: '#3B576D' },
  SER: { receive: '#D8A860', send: '#A07840' },
  SES: { receive: '#A48EB2', send: '#6B597A' },
}
// 使用 computed 定义 showLogItem，以确保响应性
const showLogItem = computed<showLogItemInterface>(() => ({
  ...props.data,
  color: logItemColors[props.data.type][props.data.direction], // 根据 type 和 direction 设置颜色
  levelColor: props.data.level === 'success' ? '#6A8E6A' : '#9E5A5A', // 设置成功或失败的颜色
  indexColor: '#808080', // 设置灰色索引颜色
}))
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.left-content {
  margin-left: 10rpx;
  display: flex;
  align-items: center;
}
.log-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px; /* Adjust spacing as needed */
}
.log-time {
  white-space: nowrap;
  color: 'blue';
}
.title-container .log-info .log-label {
  margin-top: 10rpx;
  color: #ccc;
  font-size: smaller;
}
</style>
