const toString = Object.prototype.toString

// 输入的是任何类型的，使用类型保护。
export function isDate(data: any): data is Date {
  return toString.call(data) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // 这里判断只要不是null 及unde
  return val !== null && typeof val === 'object';
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