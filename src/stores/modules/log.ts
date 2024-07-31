import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { logItemInterface, filterItemType } from '@/types/log/logItem'

export const useLogStore = defineStore('log', () => {
  const LogList = ref<logItemInterface[]>([])
  const filterType = ref<filterItemType>('ALL')
  const isAscending = ref(true)

  const showList = computed(() => {
    let filtered = LogList.value
    if (filterType.value === 'ALL') {
      return isAscending.value ? filtered : filtered.slice().reverse()
    }

    filtered = filtered.filter((logItem) => logItem.type === filterType.value)
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
// export const logStore = useLogStore()
