// 定义一个错误类型。
import { AxiosRequestConfig, AxiosResponse } from '../types/index';

export class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse

    constructor(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
        super(message);
        this.isAxiosError = true;
        this.config = config;
        this.code = code;
        this.request = request;
        this.response = response;

        // 还有需要填一个坑。设置这个对象的指定新原型 this是new出来新产生的一个对象，主把把这个this的原型设置为 Axios.prototype上面去，恢复整个原型链。
        Object.setPrototypeOf(this, AxiosError.prototype);
    }
    // 这个类是创建的实例错误类，会在xhr的调用生new出来。
}

// 创建一个工厂函数来生成AxiosError这个类。

export default function createError(message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse) {
        return new AxiosError(message, config, code, request, response)
}