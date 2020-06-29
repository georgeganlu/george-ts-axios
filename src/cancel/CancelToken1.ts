// 首先有了CancelToken这个类。 这个类是挂载到axios本身上面的。 使用的api就是
//  const CancelToken = axios.CancelToken
//  const source = CancelToken.source()
// source.cancel('Operation canceled by the user.');

import Cancel from './Cancel'
import { CancelExecutor } from '../types/index'
// 在xhr中执行的是 在xhr发送之后， cancelToken() 主方法的执行。
// let { cancelToken }  = config;   其它的配置属性省略。

/**
 * 
 * axios.get('/cancel/get', {
  cancelToken: source.token
})

 * function cancelTokenFun(): void {
      // 在发送请求之后进行取消的操作。
      if (cancelToken) {
        // 注册执行函数。
        cancelToken.promise.then(res => {
          req.abort() // 取消请求。   // 取消请求的同时会被 onerror进行捕获。
          fail(res)
        })
      }
    }
 * 
 * */

export default class CancelToken {
  promise?: Promise<Cancel>

  reson?: Cancel

  constructor(executor: CancelExecutor) {}

  static source() {
    return {}
  }
}
