// 对axios进行改造。
import Axios from './core/Axios' // Axios类实现的是实例的方法，和实例本身就是一个函数。
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosInstanceStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(initConfig: AxiosRequestConfig): AxiosInstanceStatic {
  let context = new Axios(initConfig)
  let instance = Axios.prototype.request.bind(context) // 绑定这个方法执行时的this;   // 这里instance是一个新的函数。

  // 混合对象进行拷贝。
  extend(instance, context)
  return instance as AxiosInstanceStatic
}

const axios = createInstance(defaults)

axios.create = function(config: AxiosRequestConfig) {
  let config3 = mergeConfig(defaults, config) // 合并默认配置和用户传入的配置。  axios本身是一个实例，axios.create() 函数在返回一个axios的新实例。
  return createInstance(config3)
}

axios.CancelToken = CancelToken // CancelToken类
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
