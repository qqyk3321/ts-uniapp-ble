class InfoProtocal {
  constructor() {
    this.header = 0xa1 // 固定报文头
    this.reserved = new Uint8Array([0x00, 0x00]) // 预留
    this.externalNumber = 0
  }
  /**
   * Processes the given Uint8Array and splits it into an array of Uint8Arrays based on a specified logic.
   * Each element of the returned array is a Uint8Array representing a segment of the original array.
   *
   * @param {Uint8Array} u8ArrayBuffer - The Uint8Array data to be processed and split.
   * @returns {Uint8Array[]} An array of Uint8Arrays, where each Uint8Array is a segment of the original data.
   */
  load(u8ArrayBuffer, bleMtu = 247) {
    const segmentSize = bleMtu - 3 - 8 // Assume each segment should be 50 bytes, change as necessary
    const frameCount = Math.ceil(u8ArrayBuffer.length / segmentSize)
    let segments = []
    let frameIndex = 0
    const externalNumber = this.externalNumber
    this.externalNumber += 1
    console.log({ u8ArrayBuffer, frameCount })
    for (let i = 0; i < u8ArrayBuffer.length; i += segmentSize) {
      const end = Math.min(i + segmentSize, u8ArrayBuffer.length)
      segments.push(
        this.createFrame(u8ArrayBuffer.slice(i, end), frameIndex, frameCount, externalNumber),
      )
      frameIndex += 1
    }
    console.log(segments)
    return segments
  }
  /**
   *
   * @param {Number} frameIndex
   * @param {Uint8Array} payload
   * @returns {Uint8Array}
   */
  createFrame(payload, frameIndex, frameCount, externalNumber) {
    console.log({ payload, frameIndex, frameCount, externalNumber })
    const frameLength = 8 + payload.length
    const frame = new Uint8Array(frameLength)
    let offset = 0

    // 报文头
    frame[offset++] = this.header
    // 预留
    frame.set(this.reserved, offset)
    offset += this.reserved.length
    // 外部序号
    frame[offset++] = externalNumber
    // 分帧数量
    frame[offset++] = frameCount
    // 分帧序号
    frame[offset++] = frameIndex
    // Payload长度
    frame[offset++] = payload.length
    // Payload
    frame.set(payload, offset)
    offset += payload.length
    // 校验位
    frame[offset] = this.calculateChecksum(frame)

    return frame
  }

  parseFrame(frame) {
    const checksumIndex = frame.length - 1
    const calculatedChecksum = this.calculateChecksum(frame.subarray(0, checksumIndex))
    if (frame[checksumIndex] !== calculatedChecksum) {
      throw new Error('Checksum mismatch')
    }

    const payloadLength = frame[5]
    const payload = frame.slice(6, 6 + payloadLength)
    return payload
  }

  calculateChecksum(data) {
    let sum = 0
    for (let byte of data) {
      sum += byte
    }
    return sum & 0xff // 取最低字节
  }
}

const infoProtocal = new InfoProtocal()
export default infoProtocal
