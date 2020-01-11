import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { bindURL } from '../helpers/url'
import { isPlainObject, deepMerge } from '../helpers/util'
import { processHeaders, deepMergeHeader } from '../helpers/headers'
import transform from './transform'

import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  // todo
  //   test() // 直接throw抛出的话，promisew会直接捕捉到 这个请求。
  throwIfRequestJudge(config)

  // 在发送请求之前就去验证这这个reason信息是否填写过了, 如果已经写了直接抛出来

  processConfig(config)

  return xhr(config).then(res => {
    // 在这里进行data的处理。
    // res.data = transformResponseData(res.data)
    res.data = transform(res.data, res.headers, res.config.transformResponse)

    res.data = transformResponseData(res.data)
    return res
  })
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config) // 处理了url + params参数的
  // 处理data之前要处理完header的内容。 -- 处理data会导致整个data的数据改变。

  // config.headers = transfromHeaders(config);  // 转换headers里面的内容，主要是序列化 Content-Type这个字段，

  // config.data = transformRequestData(config) // 这里处理data + 处理data的同时要处理headers的内容。
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = deepMergeHeader(config.headers, config.method!) // 这里是合并完整的headers的内容。
}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config // 只是在这里取出params的参数。
  return bindURL(url!, params) // bindURL只是处理url的形式。
}

export function transfromHeaders(config: AxiosRequestConfig): any {
  let { headers = {}, data } = config // 对这里来说这个configheaders和data都可能没有传值，也就是undefined;  // 如果headers没有传的也可以根据data的数据格式来进行转换。
  return processHeaders(headers, data)
}

export function transformRequestData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponseData(data: string): any {
  try {
    return JSON.parse(data)
  } catch (err) {
    // console.log(err);
  }
  return data
}

function throwIfRequestJudge(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}

function test() {
  throw {
    message: 'zxcvasdf'
  }
}
