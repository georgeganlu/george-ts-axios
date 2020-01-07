import { CancelExecutor } from '../types'

export interface resolvePromiseFn {
  (c: string): void
}

export default class CancelToken {
  promise: Promise<string>

  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: resolvePromiseFn

    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      this.reason = message
    })
  }
}
