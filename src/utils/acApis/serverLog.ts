import { useLogStore } from '@/stores'
import type { logItemType, logItemDirection } from '@/types/log/logItem'
export interface ServerLogItemInterface {
  title: string
  value: object
  label: string
}

const logStore = useLogStore()
class ServerLog {
  private type: logItemType = 'SER'
  private direction: logItemDirection = 'send'

  // 添加一个方法来显示当前的日志类型
  public success(item: ServerLogItemInterface): void {
    logStore.addItem({
      ...item,
      time: new Date(), // 设置当前时间
      type: this.type,
      level: 'success',
      direction: this.direction,
    })
  }
  public failed(item: ServerLogItemInterface): void {
    logStore.addItem({
      ...item,
      time: new Date(),
      type: this.type,
      level: 'failed',
      direction: this.direction,
    })
  }
}
export const serverLog = new ServerLog()
