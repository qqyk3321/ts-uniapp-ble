class BleTransportLayer {
  load(u8Array = Uint8Array()) {
    console.log('get transportLay Message', u8Array)
  }
}

const bleTransportLayer = new BleTransportLayer()
export default bleTransportLayer
