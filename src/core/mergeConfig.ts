// 合并的方法的策略。
import { AxiosRequestConfig } from '../types'



// 不同的值有不同的合并策略。

export default function mergeConfig(config1:AxiosRequestConfig, config2?: AxiosRequestConfig) : AxiosRequestConfig {  // config1代表是的默认配置， config2代表用户传入
    if (!config2) {
        config2 = {};
    }

    // 声明一个最终合并过后返回的config对象。

    const config = Object.create(null);  // any对象。

    for(let key in config1) {
        config[key] = 
    }


    function built(key) {

    }

    return config;

}