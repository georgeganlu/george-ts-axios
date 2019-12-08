import axios, { AxiosRequestConfig, AxiosResponse } from '../../src/index';


interface ResponseData<T = any> {
    code: number

    result: T  // 也就是说这个T 是一个User的类型。

    message: string
}


function getUser<T>() {
    return axios.get<ResponseData<T>>('/somepath')
        .then(res => {
            console.log(res, "+++++++++++++++++++++++++++");
            return res.data;
        })
        .catch(err => console.log(err));
}


interface User {
    name: string
    age: number
}


async function test() {
    const user = await getUser<User>();
    console.log(user.result.name);
}

test();










// axios({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hi extend',
//     }
// });

// axios.request({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// });
// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post1', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })


// 定义返回的数据类型 -- 是泛型类型的。


