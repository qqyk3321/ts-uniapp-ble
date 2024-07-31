import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { BleDevice, DeviceDictionary } from '@/types/ble/bleDevice'
interface bleDetails {
  isScanning: boolean
  isConnected: boolean
  selectDeviceId: string
  selectDeviceName: string
  bleMtu: number
  rssi: number
  serviceId: string
  writeCharacteristicId: string
  notifyCharacteristicId: string
  atWriteCharacteristicId: string
  atNotifyCharacteristicId: string
}
export const useBleInfoStore = defineStore('bleInfo', () => {
  const isConnected = ref(false)
  const isScanning = ref(false)
  const isDeviceFound = computed(() => Object.keys(devicesDict).length > 0)
  const selectDeviceId = ref('')
  const selectDeviceName = ref('')
  const bleMtu = ref(23)
  const rssi = ref(-52)
  const devicesDict = ref<DeviceDictionary>({})
  const writeCharacteristicId = ref('')
  const notifyCharacteristicId = ref('')
  const atWriteCharacteristicId = ref('')
  const atNotifyCharacteristicId = ref('')
  const serviceId = ref('')

  function updateDeviceDict(deviceId: string, device: BleDevice) {
    devicesDict.value[deviceId] = { ...device }
  }
  function clearDeviceDict() {
    devicesDict.value = {}
  }
  function startScanning() {
    isScanning.value = true
    isConnected.value = false
  }
  function reset() {
    isConnected.value = false
    isScanning.value = false
    selectDeviceId.value = ''
    selectDeviceName.value = ''
    bleMtu.value = 23
    rssi.value = -52
    clearDeviceDict()
  }
  function updateBleDetailsInfo(bleDetails: bleDetails) {
    isScanning.value = bleDetails.isScanning
    isConnected.value = bleDetails.isConnected
    selectDeviceId.value = bleDetails.selectDeviceId
    selectDeviceName.value = bleDetails.selectDeviceName
    bleMtu.value = bleDetails.bleMtu
    rssi.value = bleDetails.rssi
    serviceId.value = bleDetails.serviceId
    writeCharacteristicId.value = bleDetails.writeCharacteristicId
    notifyCharacteristicId.value = bleDetails.notifyCharacteristicId
    atWriteCharacteristicId.value = bleDetails.atWriteCharacteristicId
    atNotifyCharacteristicId.value = bleDetails.atNotifyCharacteristicId
  }

  return {
    isConnected,
    isScanning,
    isDeviceFound,
    selectDeviceId,
    selectDeviceName,
    bleMtu,
    rssi,
    devicesDict,
    updateDeviceDict,
    clearDeviceDict,
    startScanning,
    reset,
    updateBleDetailsInfo,
  }
})
// export const logStore = useLogStore()
