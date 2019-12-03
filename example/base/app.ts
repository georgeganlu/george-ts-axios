
import axios from '../../src/index';
const qs = require("qs");

// let params1 = qs.stringify({
//     a: '1',
//     b: '2',
// })

// 支持拿到返回的数据。 以promise的形式。

axios({
    method: 'post',
    url: '/base/post',
    data: {       // 传输的是object的类型，默认加上application/json的格式。
        a: 1,
        b: 2,
    }
}).then(res => {
    console.log(res);
});


axios({
    method: 'post',
    url:'/base/post',
    headers: {
        'content-type': 'application/json',
        // 'Accept': 'application/json, text/plain, */*'
    },
    data: {
        a: 'alex',
        b: 'sam',
    }
}).then(res => {
    console.log(res);
});


// 使用hedaders带参数进行验证测试。
// -------------------------------------------------------------------------------------------------------------------------------------------------------
// axios({
//     method: 'post',
//     url: '/base/post',
//     data: {       // 传输的是object的类型，默认加上application/json的格式。
//         a: 1,
//         b: 2,
//     }
// });


// axios({
//     method: 'post',
//     url:'/base/post',
//     headers: {
//         'content-type': 'application/json',
//         'Accept': 'application/json, text/plain, */*'
//     },
//     data: {
//         a: 1,
//         b: 2,
//     }
// });


// let paramsString = new URLSearchParams();
// paramsString.append("name1", "alex");
// paramsString.append("name2", "george");    // URLSearchParams会自动会进行解析。 反向说明了fetch 传文件formData对象时，不需要传入content-type的类型。
// axios({
//     url: '/base/post',
//     method: 'post',
//     data: paramsString,   // 现在也不在是一个对象了。    // 使用application.json的时候只有在data是一个真正的object 使用Object.prototype.string.call(obj) 来判断的。
// });

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 使用带data参数的传递。
// axios({
//     url: '/base/post',
//     method: 'post',
//     data: {
//         a: '1',
//         b: '2',
//     }
// });


// const arr = new Int32Array([21, 56]);

// // URLSearchParams()

// const arr1 = [1, 2, 3];
// axios({
//     url: '/base/buffer',
//     method: 'post',
//     data: arr 
// });





// -----------------------------------------------------------------------------------------------------------------------------------------------------------
// 使用get 处理params的参数类型。

// axios({
//     url: `/base/get?${params1}`,
//     method: 'get',
// });

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: ['bar', 'baz']
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: {
//             bar: 'baz'
//         }
//     }
// })

// const date = new Date()

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         date
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: '@:$, '
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: 'bar',
//         baz: null
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get#hash',
//     params: {
//         foo: 'bar'
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get?foo=bar',
//     params: {
//         bar: 'baz'
//     }
// })