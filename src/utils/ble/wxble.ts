// 蓝牙部分代码说明
/*
1. 获取权限.确认权限问题.
2. 打开蓝牙适配器
3. 开始扫描蓝牙周围环境
4. 处理每一个收到的数据
5. 关闭扫描
6. 尝试进行连接,
7. 获取服务
8. 判断需要的服务是否存在
9. 注册写入函数
10. 注册读处理函数
*/
interface IBluetoothAdapterState {
  available: boolean
}

interface IBLEConnectionResponse {
  errMsg?: string
}

interface IServiceResponse {
  services: IService[]
}

interface IService {
  uuid: string
}

interface ICharacteristicResponse {
  characteristics: ICharacteristic[]
}

interface ICharacteristic {
  uuid: string
  properties: {
    read: boolean
    write: boolean
    notify: boolean
    indicate: boolean
  }
}

interface IBLECharacteristicValueResponse {
  errMsg?: string
}

interface IBLEMTUResponse {
  mtu: number
  errMsg?: string
}
interface IModalResponse {
  confirm: boolean
}
class WxBle {
  private serviceId: string
  private writeCharacteristicId: string
  private notifyCharacteristicId: string

  constructor(serviceId: string, writeCharacteristicId: string, notifyCharacteristicId: string) {
    this.serviceId = serviceId
    this.writeCharacteristicId = writeCharacteristicId
    this.notifyCharacteristicId = notifyCharacteristicId
  }
  async isReady(): Promise<boolean> {
    const state: boolean = await new Promise<boolean>((resolve, reject) => {
      wx.getBluetoothAdapterState({
        success: (res: IBluetoothAdapterState) => {
          if (res.available) {
            console.log('蓝牙已经准备好')
            resolve(true)
          } else {
            console.log('蓝牙没有准备好')
            resolve(false)
          }
        },
        fail: (err: any) => {
          reject(err)
        },
      })
    })

    if (!state) {
      await new Promise<void>((resolve) => {
        wx.showModal({
          title: '蓝牙不可用',
          content: '请打开手机蓝牙功能',
          showCancel: false,
          success: (res: IModalResponse) => {
            if (res.confirm) {
              resolve()
            }
          },
        })
      })
    }
    return state
  }

  async isReadywait() {
    const checkBluetooth = async () => {
      const state = await new Promise((resolve, reject) => {
        wx.getBluetoothAdapterState({
          success: (res) => {
            if (res.available) {
              resolve(true)
            } else {
              resolve(false)
            }
          },
          fail: (err) => {
            reject(err)
          },
        })
      })

      if (!state) {
        // 蓝牙不可用时显示模态框
        await new Promise((resolve) => {
          wx.showModal({
            title: '蓝牙不可用',
            content: '请打开手机蓝牙功能',
            showCancel: false,
          })
        })
        // 用户确认后再次检查蓝牙状态
        await checkBluetooth()
      }
    }

    // 开始检查蓝牙状态
    try {
      await checkBluetooth()
    } catch (err) {
      console.error('检查蓝牙状态失败：', err)
      // 处理错误或重新抛出
      throw err
    }
  }

  open() {
    return new Promise((resolve, reject) => {
      wx.openBluetoothAdapter({
        success: (res) => {
          console.log('蓝牙打开成功', res)

          return resolve(res)
        },
        fail: (err) => {
          console.log('蓝牙打开失败', err)

          return reject(err)
        },
      })
    })
  }
  async close() {
    await wx.closeBluetoothAdapter()
  }
  async startDiscovery() {
    await wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      services: [this.serviceId],
    })
  }
  async stopDiscovery() {
    await wx.stopBluetoothDevicesDiscovery({})
  }
  connect(deviceId: string) {
    //弹出弹窗-->正在尝试连接设备
    return new Promise((resolve, reject) => {
      wx.createBLEConnection({
        deviceId: deviceId,
        timeout: 2000,
        success(res) {
          console.log('连接成功', res)

          return resolve(true)
        },
        fail(err) {
          return reject(err)
        },
      })
    })
  }
  async getMaxBLEMTU(deviceId: string, mtu: number, type?: 'error' | 'success'): Promise<number> {
    try {
      const resSetBLEMTU = await wx.setBLEMTU({
        deviceId: deviceId,
        mtu: mtu,
      })
      // 如果上一次错误，获取成功后直接返回结果
      if (type === 'error') {
        return mtu
      } else {
        console.log('success', mtu, resSetBLEMTU)

        return this.getMaxBLEMTU(deviceId, mtu + 20, 'success')
      }
    } catch (error) {
      console.log('error', mtu, error)

      // 如果是 success 则返回上次成功沟通的值
      if (type === 'success') {
        return mtu - 20
      } else if (mtu <= 20) {
        return 20
      }
      return this.getMaxBLEMTU(deviceId, mtu - 20, 'error')
    }
  }
  async trySetBleMtu(deviceId: string) {
    try {
      wx.setBLEMTU({
        deviceId,
        mtu: 240,
      })
    } catch (err) {
      console.error('trySetBleMtu', err)
    }
  }
  async getBLEMTU(deviceId: string): Promise<number> {
    await this.getMaxBLEMTU(deviceId, 240)
    return new Promise<number>((resolve, reject) => {
      wx.getBLEMTU({
        deviceId,
        writeType: 'write',
        success(res) {
          console.log('getBLEMTU', res)
          resolve(res.mtu)
        },
        fail(err) {
          reject(err)
        },
      })
    })
  }

  getDeviceService(deviceId: string) {
    return new Promise((resolve) => {
      wx.getBLEDeviceServices({
        deviceId,
        success: (res) => {
          console.log('getDeviceService', res)
          return resolve(res)
        },
      })
    })
  }
  getServiceCharacteristics(deviceId: string, serviceId: string) {
    return new Promise((resolve, reject) => {
      wx.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          console.log('Service characteristics:', res)
          return resolve(res)
        },
        fail: (err) => {
          console.error('Failed to retrieve service characteristics:', err)
          return reject(err)
        },
      })
    })
  }
  write(deviceId: string, serviceId: string, writeCharacteristicId: string, buffer: ArrayBuffer) {
    return new Promise((resolve) => {
      wx.writeBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId: writeCharacteristicId,
        writeType: 'writeNoResponse',
        value: buffer,
        success: (res) => {
          console.log('Data sent successfully:', res)
          return resolve(true)
        },
        fail: (err) => {
          console.error('Failed to send data:', err)
          return resolve(false)
        },
      })
    })
  }
}

export { WxBle }
