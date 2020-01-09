import { CancelExecutor, CancelTokenSource, CancelActions } from '../types'
import Cancel from './Cancel'

export interface resolvePromiseFn {
  (message?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>

  reason?: Cancel // 在接口的定义里面就决定了这个reason定义的情况 可传可不传，同样在实例的实现上也要保持一致。

  constructor(executor: CancelExecutor) {
    let resolvePromise: resolvePromiseFn // 先声明标记这是一个变量

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve // 和正常的promise不同的是
    })

    executor(message => {
      // 这里要防止用户多次调用执行函数。
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 在executor里面传入的函数里面执行 promise的 resolve来触发then的执行。
      resolvePromise()
    })
  }

  throwIfRequest(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: CancelActions

    let token = new CancelToken(c => {
      cancel = c // 取消的执行方法。
    })
    return {
      cancel,
      token
    }
  }
}

// 这里的函数多层指向完成 promise的异步取消功能。
