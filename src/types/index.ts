export type Method = 'get' | 'post' | 'delete' | 'put' | 'options' |'head' | 'patch' |
'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD' | 'PATCH';


export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    headers?: any;
    data?:any;
    params?: any;

    [propName: string] : any;   // 加上索引签名
}


