<template>
  <LogItem v-for="(logItem, index) in showList" :key="index" :logItem="logItem" :index="index" />
</template>

<script lang="ts" setup>
import { useLogStore } from '../../stores'
import { computed } from 'vue'

const logStore = useLogStore()
const showList = computed(() => logStore.showList)
</script>

<style lang="scss" scoped></style>
