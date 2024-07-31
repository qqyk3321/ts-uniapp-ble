// import { ble } from '../ble'
// import delayMs from '../../delay'
// import infoProtocal from './infoProtocal'
// import { locationDetails } from '../../location/location'
// class BleMainWrite {
//     constructor() {
//         this.isWriting = false
//     }
//     /**
//      *
//      * @param {Uint8Array} u8ArrayBuffer - The ArrayBuffer data to Send
//      */
//     async write(u8ArrayBuffer) {
//         //下面是我需要记录的数据
//         let detail = {
//             startTime: 0,
//             endTime: 0,
//             isSuccess: true,

//             failedTimes: 0,
//             successTimes: 0,
//             totalTimes: 0
//         }

//         // 检查是否有另一个写操作正在进行
//         let attempts = 0
//         while (this.isWriting && attempts < 3) {
//             // 如果正在进行写操作，随机延迟50ms到200ms
//             await delayMs(50 + Math.random() * 150)
//             attempts++
//         }

//         if (this.isWriting) {
//             console.log('Failed to write after 3 attempts')

//             return Promise.reject(`尝试多次,AT通道仍被占用`) // 如果尝试了3次仍然无法写入，放弃操作
//         }

//         try {
//             this.isWriting = true // 设置写操作标志
//             // 这里是写入操作的逻辑
//             const mtu = ble.bleMtu - 3
//             detail.startTime = Date.now()
//             detail.totalTimes = Math.ceil(u8ArrayBuffer.length / mtu)
//             console.log('detail.totalTimes', detail.totalTimes)
//             // 计算需要发送的总帧数
//             let currentIndex = 0
//             while (currentIndex < u8ArrayBuffer.length) {
//                 // 计算本次发送的帧的大小
//                 const frameSize = Math.min(mtu, u8ArrayBuffer.length - currentIndex)

//                 // 截取当前帧的数据
//                 const frame = u8ArrayBuffer.subarray(currentIndex, currentIndex + frameSize)

//                 // 发送当前帧，等待发送完成

//                 let success = false
//                 let failedTimes = 0
//                 while (!success && failedTimes < 10) {
//                     // 等待 __write 函数的 Promise 完成，并检查结果
//                     success = await ble.__write(frame, false)

//                     if (!success) {
//                         failedTimes++
//                         detail.failedTimes += 1
//                         await delayMs(10)
//                     } else {
//                         detail.successTimes += 1
//                     }
//                 }
//                 if (!success) {
//                     detail.isSuccess = false
//                     return
//                 }

//                 // 更新下一帧的起始索引
//                 currentIndex += frameSize
//             }
//         } finally {
//             this.isWriting = false // 重置写操作标志
//             detail.endTime = Date.now()
//             return detail
//         }
//     }
//     /**
//      *
//      * @param {Uint8Array} u8ArrayBuffer - The ArrayBuffer data to Send
//      */
//     async protocalWrite(u8ArrayBuffer) {
//         // 检查是否有另一个写操作正在进行
//         let attempts = 0
//         while (this.isWriting && attempts < 3) {
//             // 如果正在进行写操作，随机延迟50ms到200ms
//             await delayMs(50 + Math.random() * 150)
//             attempts++
//         }

//         if (this.isWriting) {
//             console.log('Failed to write after 3 attempts')
//             return Promise.reject(`尝试多次,AT通道仍被占用`) // 如果尝试了3次仍然无法写入，放弃操作
//         }

//         try {
//             this.isWriting = true // 设置写操作标志
//             // 这里是写入操作的逻辑
//             const sendBuffer = infoProtocal.load(u8ArrayBuffer, ble.bleMtu)
//             for (const frame of sendBuffer) {
//                 let success = false
//                 let failedTimes = 0
//                 while (!success && failedTimes < 10) {
//                     // 等待 __write 函数的 Promise 完成，并检查结果
//                     success = await ble.__write(frame, false)

//                     if (!success) {
//                         failedTimes++
//                         await delayMs(10)
//                     }
//                 }
//                 if (!success) {
//                     return Promise.resolve({}) // 超过最大尝试次数后，返回一个解决的Promise
//                 }
//             }
//         } finally {
//             this.isWriting = false // 重置写操作标志
//         }
//     }
// }
// const bleMainWrite = new BleMainWrite()
// export default bleMainWrite
