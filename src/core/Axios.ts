// 定义Axios核心类的实现。  -- 核心类本身也是一个方法
import { AxiosRequestConfig, AxiosPromise, AxiosResponse, ResolveFn, RejectFn } from '../types'
import dispatch from './dispatch'
import InterCeptorManager from './InterceptorManager'

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

    const chain: Array<PromiseChain<any>> = [
      {
        // 这个是promise的初始链。  Array 泛型的总类型。
        resolved: dispatch, // resolved 返回 dispatch的类型AxiosPromise<T = any>
        rejected: undefined
      }
    ]

    // const chain: PromiseChain<any>[] = [
    //   {
    //     resolved: dispatch,
    //     rejected: undefined
    //   }
    // ]

    // 接下来是把拦截器，加入 promiseChain的链中去。

    // 下面是把request 拦截器加入到 拦截器链中。
    this.interceptors.request.forEach(interceptor => {
      // 在Interceptors类中已 forEach已经进了 去null的操作了。
      chain.unshift(interceptor) // 加入链中间的操作 规则是 请求拦截是后设置的先执行，所以用unshift来插入到队列中。
    })

    // 对应的把响应的 response 拦截器也加入到 链中去。
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor) //  响应拦截器是 按写的入依次执行。
    })

    // 其实就是定义数据的结构，把整条链里面新加入的 请求拦截器和响应拦截器都 的函数都加入到 队列中， 一条数据就包函了 { resolved, rejected} 两个函数。
    // 定义promise的链。
    let promise = Promise.resolve(config) // 形成链的操作，利用promise.

    // axios.interceptors.request.use(function (config) {
    //   // 在发送请求之前做些什么
    //   return config;
    // }, function (error) {
    //   // 对请求错误做些什么
    //   return Promise.reject(error);
    // });
    // 对

    while (chain.length) {
      let { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected) // 可以持续的点是 不管是请求拦截还是响应拦截 在resolved函数的里面 都执行了return config这个设置，才能把链继续起来
    }
    return promise
    // return dispatch(config)
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
