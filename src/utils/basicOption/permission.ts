// permissions.js
type PermissionScope = 'scope.bluetooth' | 'scope.userLocation'
function requestPermissionsAndGuide() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        const promises = []
        const missingPermissions: PermissionScope[] = []

        if (!res.authSetting['scope.bluetooth']) {
          promises.push(requestPermission('scope.bluetooth'))
          missingPermissions.push('scope.bluetooth')
        }
        if (!res.authSetting['scope.userLocation']) {
          promises.push(requestPermission('scope.userLocation'))
          missingPermissions.push('scope.userLocation')
        }

        if (promises.length === 0) {
          resolve('所有权限已授权')
        } else {
          Promise.allSettled(promises).then((results) => {
            if (results.some((r) => r.status === 'rejected')) {
              guideUserToSettings(missingPermissions).then(resolve).catch(reject)
            } else {
              resolve('所有请求的权限已授权')
            }
          })
        }
      },
      fail() {
        reject('检查权限失败')
      },
    })
  })
}

function requestPermission(scope: PermissionScope) {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: scope,
      success: resolve,
      fail: () => reject(`${scope} 授权失败`),
    })
  })
}

function guideUserToSettings(missingPermissions: PermissionScope[]) {
  const permissionNames = {
    'scope.bluetooth': '蓝牙',
    'scope.userLocation': '地理位置',
  }

  // 生成缺失权限的描述字符串
  const missingPermissionsText = missingPermissions
    .map((scope) => permissionNames[scope])
    .join('和')

  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '需要额外的权限',
      content: `您需要授权${missingPermissionsText}权限，以保证所有功能的正常使用。`,
      showCancel: false, // 不显示取消按钮
      success(modalRes) {
        if (modalRes.confirm) {
          wx.openSetting({
            success(settingRes) {
              resolve('设置页面已打开')
            },
            fail() {
              reject('打开设置页面失败')
            },
          })
        }
      },
    })
  })
}
// permissions.js
function ensureAllPermissionsGranted() {
  return new Promise((resolve, reject) => {
    function attemptToGetPermissions() {
      requestPermissionsAndGuide()
        .then((result) => {
          console.log(result) // 可以打印每次尝试的结果
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.bluetooth'] && res.authSetting['scope.userLocation']) {
                resolve('所有权限已授权，流程完成')
              } else {
                console.log('不是所有权限都被授权，再次尝试')
                attemptToGetPermissions() // 递归调用，直到所有权限授予
              }
            },
            fail() {
              reject('检查权限失败')
            },
          })
        })
        .catch((error) => {
          reject('权限请求过程中出现错误: ' + error)
        })
    }

    attemptToGetPermissions()
  })
}

export { requestPermissionsAndGuide, ensureAllPermissionsGranted }
