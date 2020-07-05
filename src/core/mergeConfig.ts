// 合并的方法的策略。
import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const starts = Object.create(null)

//  取默认配置的方法
function defaultStrat(val1: any, val2: any) {
  // val2为用户传入的值。
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 固定类取用户配置的方法。 eg: url params data 也就是只取用户的输入的配置的属性。
function fromVal2Strat(val1: any, val2: any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 两者进行合并的策略 -- deepMergeStrat这个只是初步的合并，还要实现深拷贝的方法。
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    // 如果是判断 val2为真的话，这里是有相应的风险的，也许用户传入的值就是 false,这里就出问题了 , 用类型来判断的话，只要不是undefined
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

// 只接受自定义配置合并的策略。-这个就是用户传进来的配置，也就是自定义的 比如 url params data
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Strat // 只接受用户输入的方式。
})

const stratKeyDeepMerge = ['headers', 'auth']
stratKeyDeepMerge.forEach(key => {
  starts[key] = deepMergeStrat // 深合并的策略
})

// 其实就是把用户传入的config的配制拆成两部分，一部分是只要用户的输入的内容，包括 url, data, params.
// 另一部分是深度合并的内容

// 不同的值有不同的合并策略。
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  // config1代表是的默认配置， config2代表用户传入
  if (!config2) {
    config2 = Object.create(null)
  }

  // 声明一个最终合并过后返回的config对象。
  const config = Object.create(null) // any对象。

  // 合并默认字段方法的，在用户输入的默认字段为空的情况下。
  for (let key in config1) {
    if (!config2![key]) {
      mergeField(key)
    }
  }

  for (let key in config2) {
    //
    mergeField(key)
  }

  // starts 包含的字段是 { 'url', 'params', 'data' ,   'headers' }    // 其中url,params, data, 是只取用户输入的config,
  // headers这个是一个对象的合并，需要deepMerge, 至于其它都是值类型的拷贝。

  function mergeField(key: string): void {
    let actions = starts[key] || defaultStrat
    config[key] = actions(config1[key], config2![key])
  }

  return config
}
