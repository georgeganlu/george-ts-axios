import {isObject, isPlainObject} from "./util";


export function normalizeHeaders(headers: any, paramsName: string) : void{
    if (!headers) {
        return;
    }
    Object.keys(headers).forEach(attr => {
         let attrVal = headers[attr];
         if (attr !== paramsName && attr.toUpperCase() === paramsName.toUpperCase()) {
             headers[paramsName] = attrVal;
             delete headers[attr];
         }
    });
}


export function processHeaders(headers: any, data: any): any {
    // 这里只是要设置header-content-type的内容。 --- 这里相当于
    normalizeHeaders(headers, "Content-Type");

    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {  // 这里是且headers[content-type] 为空的时候。  就是表明这里传入的参数是object data的时候
            headers['Content-type'] = 'application/json; charset=UTF-8';   
        }
    }
    return headers;
}