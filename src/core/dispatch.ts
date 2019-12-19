import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { bindURL } from '../helpers/url'
import { isPlainObject } from '../helpers/util'
import { processHeaders } from '../helpers/headers';

import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config).then(res => {
    // 在这里进行data的处理。
      res.data = transformResponseData(res.data);      
      return res;
  });
}

export function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);  // 处理了url + params参数的  
// 处理data之前要处理完header的内容。 -- 处理data会导致整个data的数据改变。
  debugger;
  config.headers = transfromHeaders(config);
  config.data = transformRequestData(config);  // 这里处理data + 处理data的同时要处理headers的内容。
  
}

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config // 只是在这里取出params的参数。
  return bindURL(url!, params) // bindURL只是处理url的形式。
}

export function transfromHeaders(config: AxiosRequestConfig): any {
    let { headers = {}, data } = config;  // 对这里来说这个configheaders和data都可能没有传值，也就是undefined;  // 如果headers没有传的也可以根据data的数据格式来进行转换。
    return processHeaders(headers, data);
}

export function transformRequestData(config: AxiosRequestConfig): any {
  if (isPlainObject(config.data)) {
    return JSON.stringify(config.data)
  }
  return config.data
}


export function transformResponseData(data: string): any {
    try {
        return JSON.parse(data);
    } catch(err) {
        // console.log(err);
    }
    return data;
}