//  声明一个默认类型的参数。defaults的类型参数。
import { AxiosRequestConfig } from './types'
// 把processHeaders的处理放在这里进行,别把对config.data的逻辑也可以放在默认配置中完成执行。
import { processHeaders } from './helpers/headers'
import { transformRequestData, transformResponseData } from './core/dispatch'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain; */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data) // 处理headers的。
      return transformRequestData(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponseData(data)
    }
  ]
  // 这里对于一个请求 应该是除了header之外的，都是单值的字段，如果用户传入了就取用户传入的，如果没传就取默认的。 只有headeras是一个obj对象。
}

// 接下来指定 默认类型的几种header的方法，or 设定 content-type的内容。

const simpleRequest = ['get', 'head', 'delete', 'options']

simpleRequest.forEach(method => {
  defaults.headers[method] = {} // 全是挂载到headers上面的。
})

const parameterReques = ['post', 'patch', 'put']

parameterReques.forEach(method => {
  defaults.headers[method] = { 'Content-Type': 'application/x-www-form-urlencoded' }
})

export default defaults // 声明了默认的类型之后，在Axios实例中进行赋值。

//  --------------------------------------------------------------------------------------------------
// 新写的测试版。

// const defaults = {
//     method: 'get',

//     timeout: 0,

//     headers: {
//         common: {
//             Accept: "application/json, text/plain, */*"
//         }
//     }
// }

// 还有其它的对于请求方式的content-type的设置，其它设置这些的目的，都是为了在processConfig中 取一个content-type的内容。 根据 headers[method];
