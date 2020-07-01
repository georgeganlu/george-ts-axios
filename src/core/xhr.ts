import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders, isFormData } from '../helpers/util'
import createError from '../helpers/error'
import { isSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

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
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    let req = new XMLHttpRequest() // 1. 创建xhr对象

    req.open(method.toUpperCase(), url!, true) // 发送请求默认使用异步的方式。  // 2. 执行open操作。

    configureRequest() // 3. 配制请求数据。

    addEvents() // 4. 增加事件

    processHeaders() // 5. 处理headers头内容。

    cancelTokenFun() // 6. 取消请求。

    req.send(data) // 7. 发送请求。

    // 如果要扑捉错误的话，一般错误分成3种。  1种网络请求本身出错，1种超时出错，1种返回状态码不在 200-300之间的出错  总共出错的类型是3种;

    function configureRequest(): void {
      if (responseType) {
        req.responseType = responseType
      }
      if (timeout) {
        req.timeout = timeout
      }

      if (withCredentials) {
        req.withCredentials = withCredentials
        // 跨域的时候是否携带cookie,同域的情况下是默认发送cookie的。
      }
    }

    function addEvents(): void {
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
      if (onDownloadProgress) {
        req.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        req.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if ((withCredentials || isSameOrigin(url!)) && xsrfCookieName) {
        // 这里是cookieName的字段不能为空，
        const cookieValue = cookie.read(xsrfCookieName)
        if (cookieValue && xsrfHeaderName) {
          // headers['test'] = 'asdfasf'
          headers[xsrfHeaderName] = cookieValue // 给 requestHeader添加请求头。
        }
      }

      // 在给req 设置header头内容的时候先判断一下传入的data是否是FormData的内容。
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

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
    }

    function cancelTokenFun(): void {
      // 在发送请求之后进行取消的操作。
      if (cancelToken) {
        // 注册执行函数。
        cancelToken.promise.then(res => {
          console.log(res, '应该是cancel对象')
          req.abort() // 取消请求。   // 取消请求的同时会被 onerror进行捕获。
          fail(res)
        })
      }
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
