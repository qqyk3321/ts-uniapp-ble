<template>
  <uni-collapse accordion>
    <uni-collapse-item style="background-color: aqua">
      <!-- 命名插槽 'title' -->
      <template v-slot:title>
        <view class="title-container">
          <!-- 左侧内容区 -->
          <view class="left-content">
            <!-- 序号，使用uni-tag展示，样式为灰色 -->
            <uni-tag
              type="default"
              text="1"
              :inverted="true"
              style="background-color: #ccc"
            ></uni-tag>
            <!-- 日志级别和名称，垂直排列 -->
            <view class="log-info">
              <text class="log-level">Error</text>
              <text class="log-name">System Error</text>
            </view>
          </view>

          <!-- 右侧时间显示 -->
          <text class="log-time">2023-07-12 14:30</text>
        </view>
      </template>

      <!-- 默认插槽内容 -->
      <view>
        <text>这里是详细内容，它会在手风琴展开时显示。</text>
      </view>
    </uni-collapse-item>
    <uni-collapse-item title="手风琴效果">
      <view class="content">
        <text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
      </view>
    </uni-collapse-item>
    <uni-collapse-item title="手风琴效果">
      <view class="content">
        <text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
      </view>
    </uni-collapse-item>
  </uni-collapse>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aqua;
}
.left-content {
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
}
</style>
