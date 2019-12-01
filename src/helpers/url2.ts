// import { encode } from "punycode";

// 绑定url的内容的部分。

export function bindURL(url: string, params: any): string {
  if (!params) {
    return url
  }

  // 首先处理url的几种形式。
  let parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    let values = []
    // 对于数组要形成的是 key[] = "asdf"& key[] = "zxcv";
    if (val === null || val === undefined) {
      return
    }
    if (Array.isArray(val)) {
      key += '[]'
      values = val
    } else {
      values = [val]
    }

    values.forEach(val => {
      // 里面的部分排除掉时间对象及object, 当然object包括对象及array，把这两种典型的对象序列化。
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }

      // 还有其它的值就是普通的值。直接写入进入就好。
      parts.push(`${encode(key)}=${encode(val)}`) // 这里的val是上面的没有走判断的也包含在里面了。
    })
  })

  let hashIndex = url.indexOf('#')
  if (hashIndex > -1) {
    url = url.slice(0, hashIndex)
  }

  let serlizaParams = parts.join('&')

  return (url += (url.indexOf('?') > -1 ? '' : '?') + serlizaParams)
}

export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
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
