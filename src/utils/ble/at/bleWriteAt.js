import { ble } from '../ble'
import delayMs from '../../delay'
class BleAtWrite {
  constructor() {
    this.isWriting = false
  }

  async write(message = '') {
    // 检查是否有另一个写操作正在进行
    let attempts = 0
    while (this.isWriting && attempts < 3) {
      // 如果正在进行写操作，随机延迟50ms到200ms
      await delayMs(50 + Math.random() * 150)
      attempts++
    }

    if (this.isWriting) {
      console.log('Failed to write after 3 attempts')
      return Promise.reject(`尝试多次,AT通道仍被占用`) // 如果尝试了3次仍然无法写入，放弃操作
    }

    try {
      this.isWriting = true // 设置写操作标志
      // 这里是写入操作的逻辑
      message = message.trim()
      message += ']'
      message = message.toUpperCase()

      let buffer = new ArrayBuffer(message.length)
      let dataView = new DataView(buffer)
      for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i)
        dataView.setUint8(i, charCode)
      }
      const u8ArrayBuffer = new Uint8Array(buffer)
      let success = false
      let failedTimes = 0
      while (!success && failedTimes < 10) {
        // 等待 __write 函数的 Promise 完成，并检查结果
        success = await ble.__write(u8ArrayBuffer, true)

        if (!success) {
          failedTimes++
          await delayMs(10)
        }
      }
      if (!success) {
        return Promise.resolve(true) // 超过最大尝试次数后，返回一个解决的Promise
      } else {
        return Promise.resolve(false) // 成功写入，返回一个解决的Promise
      }
    } finally {
      this.isWriting = false // 重置写操作标志
    }
  }
}
const bleAtWrite = new BleAtWrite()
export default bleAtWrite
