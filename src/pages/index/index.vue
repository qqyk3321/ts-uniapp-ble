<script setup lang="ts">
import instance from '@/utils/acApis/achttps'
import { ref } from 'vue'
let res = ref({ key: 123 })
const onClick = async () => {
  console.log('确实点击了')
  res.value = await instance.get('/onlinedeviceconnstatus')
}
</script>

<template>
  <view class="index">index</view>
  <uni-card title="基础卡片">
    {{ res }}
  </uni-card>
  <button @click="onClick">点击</button>
</template>

<style lang="scss"></style>
