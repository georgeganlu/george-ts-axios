//  声明一个默认类型的参数。defaults的类型参数。
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
    method: 'get',

    timeout: 0,

    headers: {
        common: {
            Accept: 'application/json, text/plain; */*'
        }
    }
}


// 接下来指定 默认类型的几种header的方法，or 设定 content-type的内容。

const simpleRequest = ['get', 'head', 'delete', 'options'];

simpleRequest.forEach(method => {
    defaults.headers[method] = {};  // 全是挂载到headers上面的。
});


const parameterReques = ['post', 'patch', 'put'];

parameterReques.forEach(method => {
    defaults.headers[method] = {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default defaults;    // 声明了默认的类型之后，在Axios实例中进行赋值。
