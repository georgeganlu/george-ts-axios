import axios, { AxiosError } from '../../src/index';


// 三种模拟, 1种正常的网络出错, 关掉浏览器的offline
// setTimeout(() => {
//     axios({
//         url: '/error/offline',
//         method: 'post',
//         data: {
//             a: '1',
//             b: '2',
//         }
//     }).then(res => {
//         console.log(res);
//     }).catch((e: AxiosError) => {
//         debugger;
//         console.log(e.message, "这里是返回的错误的内容");    
//     });
// }, 5000);


// 2种 超时
// axios({
//     url: '/error/timeout',
//     method: 'post',
//     data: {
//         a: '1',
//         b: '2',
//     },
//     timeout: 3000     // 有时间去关闭网络。
// }).then(res => {
//     console.log(res);
// }).catch((e: AxiosError) => {
//     debugger;
//     console.log(e);
// });

// // 3种 本身请求出问题返回的不是200-300之间

axios({
    url: '/error/status',
    method: 'post',
    data: {
        a: '1',
        b: '2',
    },
    timeout: 3000     // 有时间去关闭网络。
}).then(res => {
    console.log(res);
}).catch((e: AxiosError) => {
    debugger;
    console.log(e);
});