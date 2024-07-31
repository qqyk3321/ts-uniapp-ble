// 接口定义
export interface logItemInterface {
  title: string
  type: logItemType
  value: object
  time: Date
  level: logItemLevel
  label: string
  direction: logItemDirection
}

export interface showLogItemInterface {
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
export type logItemType = 'BLE' | 'SER' | 'SES'
export type filterItemType = logItemType | 'ALL'
export type logItemDirection = 'send' | 'receive'
export type logItemLevel = 'success' | 'failed'

export type logItemColorMapping = {
  [K in logItemType]: {
    receive: string
    send: string
  }
}

