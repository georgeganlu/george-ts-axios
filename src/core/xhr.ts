import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders } from '../helpers/util'
import createError from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // xhr发送请求的三个步骤。

  return new Promise((succ, fail) => {
    let {
      url,
      data = null,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken
    } = config

    let req = new XMLHttpRequest()

    if (responseType) {
      req.responseType = responseType
    }
    if (timeout) {
      req.timeout = timeout
    }

    req.open(method.toUpperCase(), url!, true) // 发送请求默认使用异步的方式。

    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        // readyState会连续进行触发直到为 4为止。 这里先不考虑错误。
        return
      }

      // 响应的状态码在 200- 300之间。

      // 之后的话，取出接口定义的数据结构。  data  status statusText  headers config request;
      const responeseHeaders = req.getAllResponseHeaders()
      const responseData = responseType === 'text' ? req.responseText : req.response
      const resultData: AxiosResponse = {
        data: responseData,
        status: req.status,
        statusText: req.statusText,
        headers: parseHeaders(responeseHeaders),
        config,
        request: req
      }
      // 处理响应的参数.
      handleResponse(resultData)
    }

    req.onerror = function() {
      fail(createError('Network Error', config, null, req))
    }

    req.ontimeout = function() {
      // fail(new Error("请求超时"));
      fail(createError(`Timeout of ${timeout}`, config, 'ECONNABORTED', req))
    }

    // 如果要扑捉错误的话，一般错误分成3种。  1种网络请求本身出错，1种超时出错，1种返回状态码不在 200-300之间的出错  总共出错的类型是3种;

    // 发送内容前
    Object.keys(headers).forEach(name => {
      // 这里是设置headers的内容，当data数据为空时，content-type就没有设置的必要了，但是其它headers里面的内容是需要的。
      if (data === null && name.toLowerCase() === 'content-type') {
        // 对这个字段一定是同时满足
        delete headers[name] // 只是在data数据为空的情况下，只是删除掉content-type这个选项，所以
      } else {
        req.setRequestHeader(name, headers[name])
      }
    })

    req.send(data)

    // 在发送请求之后进行取消的操作。
    if (cancelToken) {
      // 注册执行函数。
      cancelToken.promise.then(res => {
        req.abort() // 取消请求。
        fail(res)
      })
    }

    // 处理handle响应.
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        succ(response)
      } else {
        let message = response.data.message || `Request failed with status code ${response.status}`
        fail(createError(message, config, null, req, response))
      }
    }
  })
}
