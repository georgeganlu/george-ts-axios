import { CancelExecutor, CancelTokenSource, CancelActions } from '../types'
import Cancel from './Cancel' // 直接把类 作为显示的类弄系统。

export interface ResolvePromiseFn {
  (message?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>

  reason?: Cancel // 在接口的定义里面就决定了这个reason定义的情况 可传可不传，同样在实例的实现上也要保持一致。

  constructor(executor: CancelExecutor) {
    debugger

    let resolvePromise: ResolvePromiseFn // 先声明标记这是一个变量

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve // 和正常的promise不同的是
    })

    // 真巧妙。

    executor(message => {
      // 这里要防止用户多次调用执行函数。
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message) // 执行函数 c 传进来的message为 string类型， 通过 new Cancel的实例类，进行实例化。
      // 在executor里面传入的函数里面执行 promise的 resolve来触发then的执行。
      resolvePromise(this.reason) // resolvePromise这个方法本来是正常promise里面的
    })
  }

  throwIfRequest(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: CancelActions

    debugger
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
