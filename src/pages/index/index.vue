<script setup lang="ts">
import { getOnlineDeviceConnStatus } from '@/utils/acApis/apis/getOnlinedeviceconnstatus'
import { ref } from 'vue'
let res = ref()
import { useLogStore } from '@/stores'
const logStore = useLogStore()
const onClick = async () => {
  console.log('确实点击了')
  res.value = await getOnlineDeviceConnStatus()
}
</script>

<template>
  <view class="index">index</view>
  <uni-card title="基础卡片">
    {{ res ? res : '当前为空' }}
    <view>----------------</view>
    {{ logStore.showList }}
  </uni-card>
  <button @click="onClick">点击</button>
</template>

<style lang="scss"></style>
