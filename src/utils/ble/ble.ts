import { WxBle } from './wxble'
import bleErrorMessage from './bleErrorMessage'
// import bleLog from './bleLog'

import { useBleInfoStore } from '@/stores'
import bleAt from './at/bleAt'
import bleTransportLayer from './Layer/bleTransportLayer'
import type { BleDevice, DeviceDictionary } from '@/types/ble/bleDevice'

const bleInfoStore = useBleInfoStore()

class CustomBle {
  private ble: WxBle
  private serviceId: string
  private writeCharacteristicId: string
  private notifyCharacteristicId: string
  private atWriteCharacteristicId: string
  private atNotifyCharacteristicId: string
  private selectDeviceId: string = ''
  private bleMtu: number = 0

  constructor(
    serviceId: string,
    writeCharacteristicId: string,
    notifyCharacteristicId: string,
    atWriteCharacteristicId: string,
    atNotifyCharacteristicId: string,
  ) {
    this.ble = new WxBle(serviceId, writeCharacteristicId, notifyCharacteristicId)
    this.serviceId = serviceId
    this.writeCharacteristicId = writeCharacteristicId
    this.notifyCharacteristicId = notifyCharacteristicId
    this.atWriteCharacteristicId = atWriteCharacteristicId
    this.atNotifyCharacteristicId = atNotifyCharacteristicId
  }
  statusChangeHandler() {
    // 如果发现蓝牙被断开了,则直接退出整个连接,清空所有内容,然后回到首页
    wx.onBluetoothAdapterStateChange((result) => {
      console.log('蓝牙连接状态发生变化', result)
      if (!result.available) {
        //首先提示蓝牙不可用
        wx.showModal({
          title: '蓝牙断开',
          content: '蓝牙设备断开,请检查设备蓝牙状态!',
          showCancel: false,
        })
        //然后提示蓝牙设备断开
        this.stop()
      }
    })
  }
  connectStatusChangeHandler() {
    wx.onBLEConnectionStateChange((res) => {
      // 该方法回调中可以用于处理连接意外断开等异常情况
      console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
      if (!res.connected) {
        this.stop()
        wx.showModal({
          title: '提示',
          content: '您的设备断开,请尝试手动重连蓝牙设备',
          showCancel: false,
        })
      }
    })
  }
  devicesFoundHandler() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        // 这里可以做一些过滤
        bleInfoStore.updateDeviceDict(device.deviceId, device)
        console.log('get new devices')
      })
      // 找到要搜索的设备后，及时停止扫描
    })
  }
  async start() {
    try {
      await this.ble.open()
      const available = await this.ble.isReady()

      if (!available) {
        throw '蓝牙设备没有打开'
      }

      this.statusChangeHandler()
      console.log('蓝牙初始化成功')
      this.ble.startDiscovery()
      this.devicesFoundHandler()
      bleInfoStore.startScanning()
    } catch (err: any) {
      this.stop()
      const errMsg = bleErrorMessage(err.errCode, err.errMsg)
      wx.showModal({
        title: '蓝牙不可用',
        content: errMsg,
        showCancel: false,
      })
      console.error(err)
    }
  }

  private async __write(u8ArrayBuffer: Uint8Array, atChannel: boolean) {
    if (atChannel) {
      const resWrite = await this.ble.write(
        this.selectDeviceId,
        this.serviceId,
        this.atWriteCharacteristicId,
        u8ArrayBuffer.buffer,
      )
      //TODO 记录日志
      //bleLog.writeDataATLog(u8ArrayBuffer, resWrite)
      return Promise.resolve(resWrite)
    } else {
      const resWrite = await this.ble.write(
        this.selectDeviceId,
        this.serviceId,
        this.writeCharacteristicId,
        u8ArrayBuffer.buffer,
      )
      //TODO 记录日志
      // bleLog.writeDataMainLog(u8ArrayBuffer, resWrite)
      return Promise.resolve(resWrite)
    }
  }

  async selectDevice(deviceId: string, deviceName: string, rssi: number) {
    try {
      wx.showLoading({
        title: `正在连接设备${deviceName}`,
      })
      await this.ble.connect(deviceId)
      await this.ble.stopDiscovery()
      this.connectStatusChangeHandler()
      this.selectDeviceId = deviceId
      // 协商MTU
      const res = await this.ble.getBLEMTU(this.selectDeviceId)
      this.bleMtu = res
      // 配置读写特征值
      const service: any = await this.ble.getDeviceService(this.selectDeviceId)
      const dataService = service.services.find(
        (element: any) => element.uuid === this.serviceId && element.isPrimary === true,
      )
      if (!dataService) {
        throw '主服务值无法找到'
      }
      const dataServiceCharacteristics: any = await this.ble.getServiceCharacteristics(
        this.selectDeviceId,
        this.serviceId,
      )

      const writeChar = dataServiceCharacteristics.characteristics.find(
        (char: any) => char.uuid === this.writeCharacteristicId.toUpperCase(),
      )
      const notifyChar = dataServiceCharacteristics.characteristics.find(
        (char: any) => char.uuid === this.notifyCharacteristicId.toUpperCase(),
      )
      const atWriteChar = dataServiceCharacteristics.characteristics.find(
        (char: any) => char.uuid === this.atWriteCharacteristicId.toUpperCase(),
      )
      const atNotifyChar = dataServiceCharacteristics.characteristics.find(
        (char: any) => char.uuid === this.atNotifyCharacteristicId.toUpperCase(),
      )
      if (writeChar && writeChar.properties.write) {
        console.log('get writechar', writeChar)
      } else {
        throw '写特征值获取失败'
      }
      if (notifyChar && (notifyChar.properties.notify || notifyChar.properties.indicate)) {
        console.log('get notifyChar', notifyChar)
      } else {
        throw '读特征值获取失败'
      }
      if (atWriteChar && atWriteChar.properties.write) {
        console.log('get AT writechar', atWriteChar)
      } else {
        throw 'AT写特征值获取失败'
      }
      if (atNotifyChar && (atNotifyChar.properties.notify || atNotifyChar.properties.indicate)) {
        console.log('get AT notifyChar', atNotifyChar)
      } else {
        throw 'AT读特征值获取失败'
      }
      // 注册AT通道处理函数
      wx.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: this.selectDeviceId,
        serviceId: this.serviceId,
        characteristicId: this.atNotifyCharacteristicId,
        success: (res) => {
          console.log('Notification AT setup successful:', res)
          wx.onBLECharacteristicValueChange((result) => {
            console.log('get at data', result)
            const u8ArrayBuffer = new Uint8Array(result.value)
            bleAt.load(u8ArrayBuffer)
            //TODO 添加
            // bleLog.notifyDataATLog(u8ArrayBuffer)
          })
        },
        fail: (err) => {
          console.error('Failed to set up  AT notification:', err)
        },
      })
      //注册透传通道处理函数
      wx.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: this.selectDeviceId,
        serviceId: this.serviceId,
        characteristicId: this.notifyCharacteristicId,
        success: (res) => {
          console.log('Notification setup successful:', res)
          wx.onBLECharacteristicValueChange((result) => {
            console.log('get main data', result)
            const u8ArrayBuffer = new Uint8Array(result.value)
            bleTransportLayer.load(u8ArrayBuffer)
            //TODO 添加
            // bleLog.notifyDataMainLog(u8ArrayBuffer)
          })
        },
        fail: (err) => {
          console.error('Failed to set up notification:', err)
        },
      })

      //下面获取AT指令相关的

      // 配置AT指令读写特征值

      //下面要进行测试如果发送
      // const service = await this.ble.getDeviceService(this.selectDeviceId)
      // console.log('now get service', service)
      // let serviceUUID
      // service.services.forEach(async (item) => {
      //     if (item.isPrimary) {
      //         serviceUUID = await this.ble.getServiceCharacteristics(this.selectDeviceId, item.uuid)
      //         console.log('get serviceUUID', serviceUUID)
      //     }
      // })

      // const serviceUUID = await this.ble.getServiceCharacteristics(this.selectDeviceId, this.serviceId)
      bleInfoStore.updateBleDetailsInfo({
        isScanning: false,
        isConnected: true,
        selectDeviceId: this.selectDeviceId,
        selectDeviceName: deviceName,
        bleMtu: this.bleMtu,
        rssi: rssi,
        serviceId: this.serviceId,
        writeCharacteristicId: this.writeCharacteristicId,
        notifyCharacteristicId: this.notifyCharacteristicId,
        atWriteCharacteristicId: this.atWriteCharacteristicId,
        atNotifyCharacteristicId: this.atNotifyCharacteristicId,
      })
    } catch (err: any) {
      wx.showToast({
        title: `无法连接设备${deviceName}`,
      })
      console.log('selectDevice失败', err)
      wx.showModal({
        title: '连接错误',
        content: `连接失败请重新连接,${err.errMsg}`,
        showCancel: false,
      })
      this.stop()
    } finally {
      wx.hideLoading()
    }
  }
  async unSelectDevice() {
    //弹出modal进行提示,如果确认断开执行stop,,否则
    const res = await wx.showModal({
      title: '提示',
      content: '您确定断开设备',
    })
    if (res.confirm) {
      await this.stop()
      wx.showModal({
        title: '提示',
        content: '您的设备断开,请尝试手动重连蓝牙设备',
        showCancel: false,
      })
    }
  }

  async stop() {
    bleInfoStore.reset()

    wx.offBLECharacteristicValueChange()
    wx.offBLEConnectionStateChange()

    wx.offBluetoothDeviceFound()
    this.ble.stopDiscovery()
    wx.offBluetoothAdapterStateChange()
    this.ble.close()
    console.log('蓝牙关闭')
  }
}
const serviceId = '0000FF00-0000-1000-8000-00805F9B34FB'
const writeCharacteristicId = '0000FF02-0000-1000-8000-00805F9B34FB'
const notifyCharacteristicId = '0000FF01-0000-1000-8000-00805F9B34FB'
const atWriteCharacteristicId = '0000FF22-0000-1000-8000-00805F9B34FB'
const atNotifyCharacteristicId = '0000FF21-0000-1000-8000-00805F9B34FB'

const ble = new CustomBle(
  serviceId,
  writeCharacteristicId,
  notifyCharacteristicId,
  atWriteCharacteristicId,
  atNotifyCharacteristicId,
)

export { ble }
