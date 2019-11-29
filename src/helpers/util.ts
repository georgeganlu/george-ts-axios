const toString = Object.prototype.toString

// 输入的是任何类型的，使用类型保护。
export function isDate(data: any): data is Date {
  return toString.call(data) === '[object Date]'
}

export function isObject(obj: any): boolean {
  // 这里判断只要不是null 及unde
  return obj !== null && obj !== undefined
}
