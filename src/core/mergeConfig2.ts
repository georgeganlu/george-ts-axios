// 合并的几种策略。

import { AxiosRequestConfig } from '../types'
import { isPlainObject, isObject } from '../helpers/util'

const starts = Object.create(null)

// 合并的函数分成了3种类型, 第一是默认的合并策略, 取的是默认的配置。
function defaultMerge(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

// 只要用户输入的字段。
function mergeFromUser(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const userConfig = ['url', 'params', 'data']

userConfig.forEach(key => {
  starts[key] = mergeFromUser
})

const commonConfig = ['headers']
commonConfig.forEach(key => {
  starts[key] = deepMerge
})

function deepMerge(val1: any, val2: any): any {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isObject(val1)) {
    return deepMerge(val1, val2)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  // 要形成合并的几种策略。  -- config1 是默认的合并策略 config2 是用户输入的合并策略。
  const config = Object.create(null)

  if (!config2) {
    config2 = {}
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeFiled(key)
    }
  }

  for (let key in config2) {
    mergeFiled(key)
  }

  function mergeFiled(key: string): any {
    // 找到具体执行合并的函数。
    let acitons = starts[key] || defaultMerge
    config[key] = acitons(config1[key], config2![key]) // config2对象不可能为空，被重新进行了赋值。 config2= {};
  }

  return config
}
