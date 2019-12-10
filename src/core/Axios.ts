// 定义Axios核心类的实现。  -- 核心类本身也是一个方法
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import dispatch from './dispatch'
import InterCeptorManager from './InterceptorManager'
import { ResolveFn, RejectFn } from '../types'

interface Interceptors {
  request: InterCeptorManager<AxiosRequestConfig>
  response: InterCeptorManager<AxiosResponse>
}

// 链的类型本身 包含初始值和一堆拦截器。
// interface PromiseChain<T> {
//   resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)      // 除了支持resolveFn函数外，还应支持dispatch函数类型
//   rejected?: RejectFn
// }
interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios {
  // request是发送请求的方法，也是把这个函数混合对象当成一个对象本身。
  interceptors: Interceptors // 定义了一个属性，并且这个属性是 Interceptors类型的。

  constructor() {
    this.interceptors = {
      request: new InterCeptorManager<AxiosRequestConfig>(),
      response: new InterCeptorManager<AxiosResponse>()
    }
  }

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

    // 要实现链式调用的话，需要形成promise的链来支持链式的调用 --- 在设计图的链式调用中有 先执行request拦截器，在执行response拦截器。
    // 先定义一个初始的链。
    // 链里面是一堆拦截器，及请求的初始值。 dispatch在此时是还没有发送请求的。

    // const chain: PromiseChain<any>[]= [{   // 这个是promise的初始链。
    //   resolved: dispatch,
    //   rejected: undefined,
    // }];

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatch,
        rejected: undefined
      }
    ]

    // 接下来是把拦截器，加入 promiseChain的链中去。
    this.interceptors.request.forEach(interceptor => {
      // 在Interceptors类中已 forEach已经进了 去null的操作了。
      chain.unshift(interceptor)
    })

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
