export interface BleDevice {
  name?: string // 蓝牙设备名称，可能不存在，因此是可选的
  deviceId: string // 蓝牙设备 id，必需的
  RSSI: number // 当前蓝牙设备的信号强度，单位 dBm，必需的
  advertisData: ArrayBuffer // 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段，必需的
  advertisServiceUUIDs: string[] // 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段，必需的
  localName: string // 当前蓝牙设备的广播数据段中的 LocalName 数据段，必需的
  serviceData: Record<string, any> // 当前蓝牙设备的广播数据段中的 ServiceData 数据段，必需的
}

export type DeviceDictionary = Record<string, BleDevice>
