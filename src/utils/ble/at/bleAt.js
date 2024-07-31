class BleAtLayer {
  load(content) {
    console.log('get BleAt Message', content.length)
  }
}

const bleAtLayer = new BleAtLayer()
export default bleAtLayer
