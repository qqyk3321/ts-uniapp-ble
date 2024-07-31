// 定义错误码与错误信息的对应关系的类型
interface ErrorCodeMap {
  [key: string]: string
}

// 定义函数参数的类型
const bleErrorMessage = (errCode: number | string, errMsg: string): string => {
  const errorCodes: ErrorCodeMap = {
    '-1': '已连接',
    '10000': '未初始化蓝牙适配器',
    '10001': '当前蓝牙适配器不可用',
    '10002': '没有找到指定设备',
    '10003': '连接失败',
    '10004': '没有找到指定服务',
    '10005': '没有找到指定特征',
    '10006': '当前连接已断开',
    '10007': '当前特征不支持此操作',
    '10008': '其余所有系统上报的异常',
    '10009': '系统特有，系统版本低于 4.3 不支持 BLE',
    '10012': '连接超时',
    '10013': '连接 deviceId 为空或者是格式不正确',
  }

  // 检查错误码是否在对象中，确保错误码是字符串类型
  if (Object.prototype.hasOwnProperty.call(errorCodes, errCode.toString())) {
    // 如果错误码在对象中，返回对应的错误信息
    return errorCodes[errCode.toString()]
  } else {
    // 如果错误码不在对象中，返回输入的错误信息
    return errMsg
  }
}

export default bleErrorMessage
