const toString = Object.prototype.toString

// 输入的是任何类型的，使用类型保护。
export function isDate(data: any): data is Date {
  return toString.call(data) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // 这里判断只要不是null 及unde
  return val !== null && typeof val === 'object'
}

export function isPlainObject(data: any): any {
  // body里面的话，主要是对对象进行序列化。
  return toString.call(data) === '[object Object]'
}

export function encode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5d/gi, ']')
}

// interface headers  {
//     [propName: string]: string
// };

export function parseHeaders(header: string): any {
  // 这里是处理head头的内容。
  if (!header) {
    return ''
  }
  // let head : headers = {};   // 这里的head 等会验证下和 Object.create(null) 空对象进行比较。
  let head = Object.create(null)
  header.split('/r/n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    value = value.trim()
    if (!key) {
      return
    }
    head[key] = value
  })
  return head
}

// 混合对象的实现 to from   --- 使用交叉类型。
export function extend<T, U>(to: T, from: U): T & U {
  for (const k in from) {
    ;(to as T & U)[k] = from[k] as any
  }
  return to as T & U
}

// 深拷贝上次的数据。
export function deepMerge(...obj: Array<any>): any {
  let result = Object.create(null) //

  // 递归进行合并。

  obj.forEach(item => {
    Object.keys(item).forEach(key => {
      let val = item[key]

      if (typeof val !== 'undefined') {
        // 这里的val还要分成几种情况     --- 在这里 数组对象里面的 各个obj 是可能有重复的key的。
        if (isPlainObject(val)) {
          // 这里要加一层的判断，因为这个和完全的深拷贝有一点不同，不同obj里的相同字段的值，这里我们都需要保留
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val) // 正常情况下只有header的是defaultConfig 对用户config进行补充。
          } else {
            result[key] = deepMerge(val) // 这一步的递归已经把result[key] 变成了一个对象了。  // 在deepMergeStrat
          }
        } else {
          // 看下 key是否是Content-type的情况。
          if (key === 'Content-Type') {
            console.log('测试++++++++++++++++++++++++')
          }

          result[key] = val // 这里对于同一种key的 value为值类型的 key字段只会有一个，因为总共合并的对象就 defaultConfig + config
        }
      }
    })
  })
  return result
}
