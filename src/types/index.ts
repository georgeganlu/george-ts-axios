// 声明的联合类型。
export type Method =
  | 'get'
  | 'post'
  | 'delete'
  | 'put'
  | 'options'
  | 'head'
  | 'patch'
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'PUT'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  headers?: any
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType // 设置响应的数据类型。
  timeout?: number
  transformRequest?: AxiosTransform | AxiosTransform[]
  transformResponse?: AxiosTransform | AxiosTransform[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string // 存在cookie中的key字段。
  xsrfHeaderName?: string // 加在requestHeaders头中的内容。
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AuthBasicSource
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseUrl?: string

  [propName: string]: any
}

// 现在定义返回的配置参数 作promise的链式调用，可以拿到服务端返回的数据data，http status 状态消息 statusText 响应头headers 请求配置对象config的参数。
// 定义响应的数据类型。
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any // 对象实例。
}

// 对于一个正常的xhr请求回来的东西包括 data , status, statusText, headers, config, request;

// axios返回的是一个promise的对象，可以定义一个AxiosPromise的接口，继承这个这个泛型接口。
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
  // 定义一个接口继承这个泛型类。
}

export interface AxiosError<T> extends Error {
  // 错误类型应有的字段
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse<T>
}

// 给Axios接口进行扩展 -- 定义数据接口类型。

// 实例有的方法。
export interface Axios {
  // 使用request作请求的一个入口。

  // 在把所有的请求方法分成两种请求的形式, get post => 分别包含的请求方法是  get=> get head options delete   post=> post put patch
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // get请求传入的参数基本就是url + config ?
  // 接下来是post请求，多加一个参数是data
  post<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T> // 打补丁。
}

// 实例本身就是一个方法   使用<T = any> 代表这个类型变量可以是任何一种类型，或都不传类型也可以，不然就必须传入一个类型。
export interface AxiosInstance extends Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  defaults: AxiosRequestConfig // 在类的实现上申明了这个字段，so在接口数据定义上也要定义这个字段

  <T = any>(config: AxiosRequestConfig): AxiosPromise<T> // axios主方法 这个主方法可以不传入

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // axios方法重载。
}

// 这里的types全部是类型结构定义。 可以通过index.ts导出对外的。

// 拦截器定义管理。
// 对一个拦截器来说 需要有的东西是axios.interceptor.request.use   axios.interceptor.response.use
// 响应和

// 现在只是定义了接口，对外暴露接口，也就是这个函数的定义。

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolveFn<T>, reject?: RejectFn): number

  eject(val: number): void // eject要做的事只是删除对应的拦截器。
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T> // resolveFn函数应该是一个泛型的，因为在request请求时resolve(res)  里的res是一个AxiosRequestConfig   但到了response时 这里的res是一个AxiosResponseData类型的数据。
}

export interface RejectFn {
  (error: any): any // 正常作为promise的error的话，是可返回，也可以不返回数据相关的内容的。
}

export interface AxiosTransform {
  // 定义了函数结构。
  (data: any, headers?: any): any
}

// 静态的类类型。
// 定义一个实例的继承的方法 axios.create()  // 返回一个新的 axios的实例。
export interface AxiosInstanceStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  // 给实例增加三个属性。
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 定义了接口类型，还要进行实现这个接口的类型 。

// 定义CancelToken这个实例类的数据结构。
export interface CancelToken {
  // 接品只是类的定义。
  promise: Promise<Cancel>
  reason?: Cancel

  // 如果对一个请求的cancelToken已经被使用过后的话，那
  throwIfRequest(): void
}

// 这个实例类有一个构造函数，定义这个函数。
export interface CancelExecutor {
  (fn: CancelActions): void
}

// 定义构造函数里面最终要执行的函数。
export interface CancelActions {
  (reason?: string): void
}

// 扩展CancelToken的静态接口。
export interface CancelTokenSource {
  // 这个是cancelToken.source()这个静态方法，返回的一个对象。
  token: CancelToken // 这个对象的结构是 token是 一个新的cancelToken对象。
  cancel: CancelActions // cancel是一个最终的执行方法。
}

// 还要定义cancelToken这个类型, cancelToken这个类本身可以实例化，同时还有一个source这个静态属性。 这里是类类型。
export interface CancelTokenStatic {
  new (exector: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

// 在实例化的时候 axios.CancelToken 返回 CancelToken这个类。

// 所以CancelTokenStatic这个静态类型就定义了CancelToken这个类。

// 在定义cancel这个信息类 这个是实例的数据结构
export interface Cancel {
  message?: string
}

// Cancel这个类的类型。
export interface CancelStatic {
  new (message?: string): Cancel // 这里是类的类型。
}

export interface AuthBasicSource {
  username: string
  password: string
}
