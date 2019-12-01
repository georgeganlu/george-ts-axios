import { AxiosRequestConfig } from './types'
import { bindURL } from './helpers/url'

import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): void {
  // todo
  processConfig(config)
  console.log(config.url, config.params)
  xhr(config)
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return bindURL(url, params)
}
