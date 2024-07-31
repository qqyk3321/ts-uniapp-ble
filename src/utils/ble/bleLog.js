// import CustomLog from '../log/log'
// import { localhms } from '../dateTime'
// /**
//  * @description 该函数把Uint8Array
//  * 转换为 data: {
//             Ascii: newData.ascii,
//             Uint8: newData.uint8,
//             Length:
//         },
//  *
//  */
// const u8Array2FormatData = (u8ArrayBuffer, direction, isSuccess) => {
//     // 获取长度,
//     const length = u8ArrayBuffer.byteLength
//     // 获取对应Ascii表示
//     let Ascii = String.fromCharCode.apply(null, u8ArrayBuffer)
//     // 美化字符串显示
//     // Ascii = Ascii.replace(/\r/g, '\\r').replace(/\n/g, '\\n')
//     // hexString展示
//     const Uint8 = Array.from(u8ArrayBuffer, (byte) => `0x${byte.toString(16).padStart(2, '0')}`).join(' ')
//     let formattedData = {
//         结果: isSuccess ? '成功' : '失败',
//         time: localhms(),
//         data: {
//             Ascii,
//             Uint8,
//             length
//         },
//         direction: direction === 'r' ? '接收' : '发送'
//     }
//     return formattedData
// }

// class BLELog extends CustomLog {
//     constructor(description, isActive) {
//         super(description, isActive) // 调用父类构造函数，传递必要的参数
//     }
//     notifyDataMainLog(u8ArrayBuffer, isSuccess = true) {
//         // 假设这里需要从ArrayBuffer转换成字符串，可以使用TextDecoder或其他适当的方法
//         // 例如，这里仅做示例，实际转换可能需要根据你的具体需求调整
//         const formattedOutput = u8Array2FormatData(u8ArrayBuffer, 'r', isSuccess)
//         const level = isSuccess ? 'info' : 'error'
//         const color = isSuccess ? '#5AA7FF' : '#FF6347' /* 较浅蓝色 */
//         const name = isSuccess ? '主通道数据接收成功' : '主通道数据接收失败'
//         // 调用继承自CustomLog的saveLog方法
//         this.saveLog({
//             level,
//             location: 'ble.js',
//             name,
//             content: formattedOutput,
//             color
//         })
//     }
//     writeDataMainLog(content = {}, isSuccess = true) {
//         // 假设这里需要从ArrayBuffer转换成字符串，可以使用TextDecoder或其他适当的方法
//         // 例如，这里仅做示例，实际转换可能需要根据你的具体需求调整

//         const formattedOutput = u8Array2FormatData(content, 's', isSuccess)
//         const level = isSuccess ? 'info' : 'error'
//         const color = isSuccess ? '#0056B3' : '#FF6347' /* 较深蓝色 */
//         const name = isSuccess ? '主通道数据发送成功' : '主通道数据发送失败'
//         // 调用继承自CustomLog的saveLog方法
//         this.saveLog({
//             level,
//             location: 'ble.js',
//             name,
//             content: formattedOutput,
//             color
//         })
//     }
//     /**
//      * @param {Uint8Array} u8ArrayBuffer - The ArrayBuffer data received from the AT channel to be logged.
//      * @param {boolean} [isSuccess=true] - Optional boolean flag indicating whether the data reception was successful.
//      */
//     notifyDataATLog(u8ArrayBuffer, isSuccess = true) {
//         const formattedOutput = u8Array2FormatData(u8ArrayBuffer, 'r', isSuccess)
//         const level = isSuccess ? 'info' : 'error'
//         const color = isSuccess ? '#9A85CC' : '#FF6347' /* 较浅紫色 */
//         const name = isSuccess ? 'AT通道数据接收成功' : 'AT通道数据接收失败'
//         this.saveLog({
//             level,
//             location: 'ble.js',
//             name,
//             content: formattedOutput,
//             color
//         })
//     }
//     /**
//      * @param {Uint8Array} u8ArrayBuffer - The ArrayBuffer data received from the AT channel to be logged.
//      * @param {boolean} [isSuccess=true] - Optional boolean flag indicating whether the data reception was successful.
//      */
//     writeDataATLog(u8ArrayBuffer, isSuccess = true) {
//         // 假设这里需要从ArrayBuffer转换成字符串，可以使用TextDecoder或其他适当的方法
//         // 例如，这里仅做示例，实际转换可能需要根据你的具体需求调整
//         const formattedOutput = u8Array2FormatData(u8ArrayBuffer, 's', isSuccess)
//         const level = isSuccess ? 'info' : 'error'
//         const color = isSuccess ? '#493D79' : '#FF6347' /* 较深紫色 */
//         const name = isSuccess ? 'AT通道数据发送成功' : 'AT通道数据发送失败'
//         // 调用继承自CustomLog的saveLog方法
//         this.saveLog({
//             level,
//             location: 'ble.js',
//             name,
//             content: formattedOutput,
//             color
//         })
//     }
// }

// const bleLog = new BLELog('BLE', true)

// export default bleLog
