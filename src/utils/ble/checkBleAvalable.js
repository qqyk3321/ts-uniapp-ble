import { getStorage } from '../wxoptions/storage'
const checkBleAvalable = () => {
  const bleDetails = getStorage('bleDetails')
  // const bleDetails = 1
  if (!bleDetails) {
    wx.showModal({
      title: '访问受限',
      content: '你当前无法访问该页面,确认蓝牙是否连接',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          // 使用 switchTab 跳转到 TabBar 页面

          wx.switchTab({
            url: '/pages/ble/ble',
          })
        }
      },
    })
  } else {
    return bleDetails
  }
}
export default checkBleAvalable
