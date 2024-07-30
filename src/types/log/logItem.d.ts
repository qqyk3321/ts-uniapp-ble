// 接口定义
interface logItemInterface {
  title: string
  type: logItemType
  value: object
  time: Date
  level: logItemLevel
  label: string
  direction: logItemDirection
}

interface showLogItemInterface {
  color: string // 由 type 和 direction 推导的颜色
  levelColor: string // 日志级别的颜色
  indexColor: string // 常用于文本或背景
  title: string
  type: logItemType
  value: object
  time: Date
  level: logItemLevel
  label: string
  direction: logItemDirection
}

// 类型定义
type logItemType = 'BLE' | 'SER' | 'SES'
type logItemDirection = 'send' | 'receive'
type logItemLevel = 'success' | 'failed'

type logItemColorMapping = {
  [K in logItemType]: {
    receive: string
    send: string
  }
}
