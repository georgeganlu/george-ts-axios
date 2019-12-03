

// 声明的联合类型。
export type Method = 'get' | 'post' | 'delete' | 'put' | 'options' |'head' | 'patch' |
'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD' | 'PATCH';


export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    headers?: any;
    data?:any;
    params?: any;
    responseType?: XMLHttpRequestResponseType;  // 设置响应的数据类型。
    [propName: string] : any;   // 加上索引签名
}



// 现在定义返回的配置参数 作promise的链式调用，可以拿到服务端返回的数据data，http status 状态消息 statusText 响应头headers 请求配置对象config的参数。
export interface AxiosResponse{
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;  // 对象实例。
}

// 对于一个正常的xhr请求回来的东西包括 data , status, statusText, headers, config, request;

// axios返回的是一个promise的对象，可以定义一个AxiosPromise的接口，继承这个这个泛型接口。
export interface AxiosPromise extends Promise<AxiosResponse> {   // 定义一个接口继承这个泛型类。

}

// 上面实现类型接口的定义。
