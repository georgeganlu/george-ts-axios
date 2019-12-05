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

export function parseHeaders(header: string) : any {
    // 这里是处理head头的内容。
    if (!header) {
        return '';
    }
    // let head : headers = {};   // 这里的head 等会验证下和 Object.create(null) 空对象进行比较。
    let head = Object.create(null);
    header.split('/r/n').forEach(line => {
        let [key, value] = line.split(':');
        key = key.trim().toLowerCase();
        value = value.trim();
        if (!key)  {
            return
        }        
        head[key] = value;
    });
    return head;
} 


// 混合对象的实现 to from   --- 使用交叉类型。
export function extend<T, U>(to:T, from: U): T & U {
    for(const k in from) {
        (to as T & U)[k] = from[k] as any
    }
    return to as T & U;
}