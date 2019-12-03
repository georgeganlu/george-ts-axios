import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/util';
export default function xhr(config: AxiosRequestConfig):AxiosPromise  {
    // xhr发送请求的三个步骤。

    return new Promise((succ, fail) => {
        let { url, data = null, method = 'get', headers = {}, responseType } = config;

        let req = new XMLHttpRequest();

        if (responseType) {
            req.responseType = responseType;
        }

        req.open(method, url, true) // 发送请求默认使用异步的方式。

        req.onreadystatechange = function () {
            if (req.readyState !== 4) {   // readyState会连续进行触发直到为 4为止。 这里先不考虑错误。
                return
            }

            // 之后的话，取出接口定义的数据结构。  data  status statusText  headers config request;
            const responeseHeaders = req.getAllResponseHeaders();
            const responseData = responseType === 'text' ? req.responseText : req.response;
            const resultData: AxiosResponse = {
                data: responseData,
                status: req.status,
                statusText: req.statusText,
                headers: parseHeaders(responeseHeaders),
                config,
                request: req,
            }
            succ(resultData);
        }

        Object.keys(headers).forEach(name => {
            // 这里是设置headers的内容，当data数据为空时，content-type就没有设置的必要了，但是其它headers里面的内容是需要的。
            if (data === null && name.toLowerCase() === 'content-type') {  // 对这个字段一定是同时满足
                delete headers[name];  // 只是在data数据为空的情况下，只是删除掉content-type这个选项，所以
            } else {
                req.setRequestHeader(name, headers[name]);
            }
        });
        req.send(data)
    })
}
