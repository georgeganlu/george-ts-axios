import { AxiosRequestConfig } from './types'
import { bindURL } from './helpers/url'
import { isPlainObject } from './helpers/util'

import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): void {
  // todo
  processConfig(config)
  xhr(config)
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config // 只是在这里取出params的参数。
  return bindURL(url, params) // bindURL只是处理url的形式。
}

export function transformRequestData(config: AxiosRequestConfig): any {
  if (isPlainObject(config.data)) {
    return JSON.stringify(config.data)
  }
  return config.data
}
