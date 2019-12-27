import { isObject, isPlainObject, deepMerge } from './util'
import { Method } from '../types'

export function normalizeHeaders(headers: any, paramsName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(attr => {
    let attrVal = headers[attr]
    if (attr !== paramsName && attr.toUpperCase() === paramsName.toUpperCase()) {
      headers[paramsName] = attrVal
      delete headers[attr]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  // 这里只是要设置header-content-type的内容。 --- 这里相当于
  normalizeHeaders(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // 这里是且headers[content-type] 为空的时候。  就是表明这里传入的参数是object data的时候
      headers['Content-Type'] = 'application/json; charset=UTF-8'
    }
  }
  return headers
}

export function deepMergeHeader(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  // 就基本是一个对象的copy了, 深拷贝, 与拷贝出来的数据的结构是保持一致的。
  headers = deepMerge(headers.common, headers[method], headers) // deepMerge就是用一个对象缓存所有的属性。 形成一个对象。
  // 输入headers[method] 的目的是为了把这个属性提取出来。

  // 在合并的时候把headers[method] 这个要提取的属性放在前台，其它是被后面headers 里面的一些属性给替代了的。

  // 接下来要删除之前输入的默认的属性。
  const defaultsProps = ['get', 'post', 'put', 'delete', 'head', 'options', 'patch', 'common']

  defaultsProps.forEach(prop => {
    delete headers[prop]
  })

  return headers
}
