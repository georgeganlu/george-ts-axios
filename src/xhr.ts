import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  // xhr发送请求的三个步骤。
  let { url, params = null, method = 'get' } = config

  let req = new XMLHttpRequest()

  req.open(method, url, true) // 发送请求默认使用异步的方式。

  req.send(params)
}
