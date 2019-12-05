

// 声明的联合类型。
export type Method = 'get' | 'post' | 'delete' | 'put' | 'options' |'head' | 'patch' |
'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD' | 'PATCH';


export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    headers?: any;
    data?:any;
    params?: any;
    responseType?: XMLHttpRequestResponseType;  // 设置响应的数据类型。
    timeout?: number,
}



// 现在定义返回的配置参数 作promise的链式调用，可以拿到服务端返回的数据data，http status 状态消息 statusText 响应头headers 请求配置对象config的参数。
// 定义响应的数据类型。
export interface AxiosResponse<T>{
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;  // 对象实例。
}

// 对于一个正常的xhr请求回来的东西包括 data , status, statusText, headers, config, request;

// axios返回的是一个promise的对象，可以定义一个AxiosPromise的接口，继承这个这个泛型接口。
export interface AxiosPromise<T> extends Promise<AxiosResponse<T>> {   // 定义一个接口继承这个泛型类。

}

export interface  AxiosError<T> extends Error {
    // 错误类型应有的字段
    isAxiosError: boolean
    config: AxiosRequestConfig,
    code?: string | null
    request?: any
    response?: AxiosResponse<T>
}

// 给Axios接口进行扩展 -- 定义数据接口类型。


// 实例有的方法。
export interface Axios {
    // 使用request作请求的一个入口。

    // 在把所有的请求方法分成两种请求的形式, get post => 分别包含的请求方法是  get=> get head options delete   post=> post put patch
    request<T>(config: AxiosRequestConfig): AxiosPromise<T>;

    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;   // get请求传入的参数基本就是url + config ?
    // 接下来是post请求，多加一个参数是data
    post<T>(url: string, data: any, config?: AxiosRequestConfig):AxiosPromise<T>
    put<T>(url: string, data: any, config?: AxiosRequestConfig):AxiosPromise<T>
    patch<T>(url: string, data: any, config?: AxiosRequestConfig):AxiosPromise<T>   // 打补丁。
}

// 实例本身就是一个方法
export interface AxiosInstance extends Axios {
    <T>(config: AxiosRequestConfig) : AxiosPromise<T>;  // axios主方法 这个主方法可以不传入

    <T>(url: string, config?: AxiosRequestConfig):AxiosPromise<T>;  // axios方法重载。
}












// 这里的types全部是类型结构定义。 可以通过index.ts导出对外的。
