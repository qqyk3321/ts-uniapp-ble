import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLogStore = defineStore('log', () => {
  const LogList = ref<logItemInterface[]>([])
  const filterType = ref<logItemType>('BLE')
  const isAscending = ref(true)

  const showList = computed(() => {
    const filtered = LogList.value.filter((logItem) => logItem.type === filterType.value)
    return isAscending.value ? filtered : filtered.slice().reverse()
  })

  const addItem = (newLogItem: logItemInterface) => {
    LogList.value.push(newLogItem)
  }

  const reset = () => {
    LogList.value = []
    filterType.value = 'BLE'
    isAscending.value = true
  }

  const toggleSortOrder = () => {
    isAscending.value = !isAscending.value
  }

  return {
    LogList,
    showList,
    filterType,
    isAscending,
    reset,
    addItem,
    toggleSortOrder,
  }
})
