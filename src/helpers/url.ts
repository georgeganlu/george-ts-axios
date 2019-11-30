// 采用url-encode的方式来处理url的方式。

import { isDate, isObject , encode} from './util'

export function bindURL(url: string, params?: any): string {
  // 对url的处理方式的形式。 其实以前是qs做的工作。 现在学造轮子。
  if (!params) {
    return url
  }

  // 先声明一个长的数据。来放入key=value

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    let values: string[]
    if (val === null || val === undefined) {
      return
    }
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      // 如果是除数组之外的元素。可以直接使用JSON.stringify()来序列化。
      values = [val]
    }

    values.forEach(val => {
      //  这里不排除数据里面有参数的值是null;
      // 看values里面的值有没有 Data类型的 or 不为null and undefeind;
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
          val = JSON.stringify(val);
      }
    //  解析了val是日期及 对象obj array 之后, 其它的类型就直接给定相应的 值类型。
      parts.push(`${encode(key)}=${encode(val)}`);
    });

    let serializedParams = parts.join("&");
    if (serializedParams) {
        // 看url中是否包含hash。如果有是丢弃hash的。
        let hashIndex = url.indexOf("#");
        if (hashIndex > -1) {
            url = url.slice(0, hashIndex);  // 把hash后面的丢弃。
        }
        let includeMark =  url.indexOf("?") > - 1 ? '' : '?';
        url += includeMark;
    }    
  });
  return url;
}
