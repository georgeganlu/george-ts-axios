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
  config.url = transformUrl(config);  // 处理了url + params参数的  
// 处理data之前要处理完header的内容。 -- 处理data会导致整个data的数据改变。
  config.headers = transfromHeaders(config);

  config.data = transformRequestData(config);  // 这里处理data + 处理data的同时要处理headers的内容。

}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config // 只是在这里取出params的参数。
  return bindURL(url, params) // bindURL只是处理url的形式。
}

export function transfromHeaders(config: AxiosRequestConfig): any {
    let { headers = {}, data } = config;
}

export function transformRequestData(config: AxiosRequestConfig): any {
  if (isPlainObject(config.data)) {
    return JSON.stringify(config.data)
  }
  return config.data
}
