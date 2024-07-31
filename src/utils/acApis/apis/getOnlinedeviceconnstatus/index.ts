import type { AxiosError } from 'axios'
import instance from '../../achttps'
import { serverLog } from '@/utils/acApis/serverLog'
export interface DeviceInfo {
  csq: number
  iccid: string
  ip: string
  imei: string
  dtuVersion: number
  loginAt: string
  imsi: string
  channelId: string
  cellId: string
  pci: string
  status: 'online' | 'offline'
}
export interface DevicesResponse {
  traceId: string | null
  devices: {
    [deviceId: string]: DeviceInfo
  }
  deviceCount: number
}

export const getOnlineDeviceConnStatus = async (imei?: string): Promise<DevicesResponse | null> => {
  try {
    const response = imei
      ? await instance.post<DevicesResponse>('/onlinedeviceconnstatus', { imei })
      : await instance.get<DevicesResponse>('/onlinedeviceconnstatus')
    serverLog.success({
      title: '获取设备状态',
      value: response,
      label: imei ? 'post-onlinedeviceconnstatus' : 'get-onlinedeviceconnstatus',
    })

    return response.data
  } catch (err: any) {
    console.error('Error fetching device connection status:', err)
    serverLog.failed({
      title: '获取设备状态',
      value: err,
      label: imei ? 'post-onlinedeviceconnstatus' : 'get-onlinedeviceconnstatus',
    })
    throw err // Optional: rethrow the error if you want the caller to handle it
  }
}
