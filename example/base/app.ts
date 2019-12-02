
import axios from '../../src/index';
const qs = require("qs");

let params1 = qs.stringify({
    a: '1',
    b: '2',
})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 使用带data参数的传递。
axios({
    url: '/base/post',
    method: 'post',
    data: {
        a: '1',
        b: '2',
    }
});




const arr = new Int32Array([21, 56]);

const arr1 = [1, 2, 3];
axios({
    url: '/base/buffer',
    method: 'post',
    data: arr,
});











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