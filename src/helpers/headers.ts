import {isObject} from "./util";


export function normalizeHeaders(headers: any, paramsName: string) : void{
    if (!headers) {
        return;
    }

    Object.keys(headers).forEach(attr => {
         let attrVal = headers[attr];
         if (attr && attr.toUpperCase() === paramsName.toUpperCase()) {
             headers[paramsName] = attrVal;
             delete headers[attr];
         }
    });
}



export function processHeaders(headers: any, data: any): any {
    // 这里只是要设置header-content-type的内容。 --- 这里相当于
    normalizeHeaders(headers, "Content-Type");

    if (isObject(data)) {
        if (headers && headers['Conteny-Type']) {
            headers['Content-type'] = 'application/json; charset=utf-8';   
        }
    }
    return headers;
}