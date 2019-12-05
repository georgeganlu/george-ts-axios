// 对axios进行改造。
import Axios from './core/Axios';   // Axios类实现的是实例的方法，和实例本身就是一个函数。
import { extend } from './helpers/util'; 
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance{
    let context = new Axios();
    let instance = Axios.prototype.request.bind(context);   // 绑定这个方法执行时的this;

    // 混合对象进行拷贝。
    extend(instance, context);
    return instance as AxiosInstance;
}

const axios = createInstance();

export default axios;


