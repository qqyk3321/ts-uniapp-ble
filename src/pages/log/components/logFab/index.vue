<template>
  <uni-fab
    ref="fab"
    :pattern="pattern"
    :content="content"
    horizontal="right"
    vertical="bottom"
    direction="horizontal"
    @trigger="trigger"
  />
</template>

<script lang="ts" setup>
import { useLogStore } from '../../../../stores'
const logStore = useLogStore()
const pattern = {
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#007AFF',
  buttonColor: '#007AFF',
  iconColor: '#fff',
}
const content = [
  {
    text: '清空',
    active: false,
  },
  {
    text: '配置',
    active: false,
  },
]
import type { UniFabOnTriggerEvent } from '@uni-helper/uni-ui-types'

const trigger = (e: UniFabOnTriggerEvent) => {
  console.log(e)
  if (e.index === 0) {
    logStore.reset()
    uni.showToast({

    })
  }
}

</script>

<style lang="scss" scoped></style>
