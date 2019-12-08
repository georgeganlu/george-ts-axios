// 定义Axios核心类的实现。  -- 核心类本身也是一个方法
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import dispatch from './dispatch'

export default class Axios {
  // request是发送请求的方法，也是把这个函数混合对象当成一个对象本身。
  request(url: any, config?: any): AxiosPromise {
    // 在里面进行了一个判断 实现函数的重载。
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatch(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // 要做的事是merge合并参数，到this.request发送完整的请求。
    return this._requestWithGet('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithGet('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithGet('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithGet('options', url, config)
  }

  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithPost('post', url, data, config)
  }
  put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithPost('put', url, data, config)
  }
  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithPost('patch', url, data, config)
  }

  _requestWithGet(method: string, url: string, config?: AxiosRequestConfig): AxiosPromise {
    let params = Object.assign(config || {}, {
      url,
      method
    })
    return this.request(params as AxiosRequestConfig)
  }

  _requestWithPost(
    method: string,
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    let params = Object.assign(config || {}, {
      url,
      method,
      data
    })
    return this.request(params as AxiosRequestConfig)
  }
}