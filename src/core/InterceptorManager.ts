import { ResolveFn, RejectFn } from '../types'

export interface interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}

export default class InterCeptorManager<T> {
  // 这个拦截器有一个用来装拦截器的队列属性，并且这个属性是一个私有的数组。

  private interceptors: Array<interceptor<T> | null> // 声明了一个私有的队列 数构结构是 加入的use里面的拦截器函数。 把每一个新加入的拦截器方法，以一个对象数据的方法推入队列。

  constructor() {
    this.interceptors = [] // 给初始化的值。
  }
  // 添加拦截器的方法。
  use(resolved: ResolveFn<T>, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1 // 对创建的实例新添加方法。
  }

  eject(id: number): void {
    // 删除队列里面的某一个id 的拦截器的数据。
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (interceptor: interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        // 这里设置了拦截器的不为空。
        fn(interceptor)
      }
    })
  }
}
