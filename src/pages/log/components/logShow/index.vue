<template>
  <uni-collapse accordion>
    <block v-if="logStore.showList.length > 0">
      <!-- 使用 v-for 来循环数组, 并使用 :key 来指定唯一键 -->
      <logItem
        v-for="(item, index) in logStore.showList"
        :key="index"
        :index="index"
        :data="item"
      />
    </block>
    <!-- 当数组为空时显示提示信息 -->
    <view v-else class="empty-data">
      <uni-icons type="info" color="#909399" size="50"></uni-icons>
      <text class="empty-text">暂时没有数据</text>
    </view>
  </uni-collapse>
</template>

<script lang="ts" setup>
import logItem from '../logItem/index.vue'
import { useLogStore } from '../../../../stores'
const logStore = useLogStore()

import { onLoad } from '@dcloudio/uni-app'
onLoad(() => {
  console.log('getin logShow')
})
</script>

<style lang="scss" scoped>
.empty-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px; // 增加高度以便更好的视觉效果
  text-align: center;
  color: #909399; // 调整颜色使其更柔和
}

.empty-text {
  margin-top: 20px; // 文本与图标间增加间距
  font-size: 16px; // 适当的字体大小
}
</style>
