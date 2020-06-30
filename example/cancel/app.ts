import axios, { CancelActions } from '../../src/index';


const CancelToken = axios.CancelToken
const source = CancelToken.source()

debugger;

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  debugger;
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

source.cancel('Operation canceled by the user.');

// setTimeout(() => {
 
//   setTimeout(() => {
//     axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
//       debugger;
//       if (axios.isCancel(e)) {
//         console.log(e.message)
//       }
//     })
//   }, 200)
// }, 100)


// let cancel: CancelActions
// axios.get('/cancel/get', {
//   cancelToken: new CancelToken(c => {
//     cancel = c
//   })
// }).catch(function(e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled')
//   }
// })

// setTimeout(() => {
//    cancel("用户取消");
// }, 500)





















// // 下面是 CancelToken的两种调用方法。

// const CancelToken = axios.CancelToken;  // 实
// const source = CancelToken.source();

// axios.get('/user/12345', {
//   cancelToken: source.token
// }).catch(function (e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled', e.message);
//   } else {
//     // 处理错误
//   }
// });

// // 取消请求 (请求原因是可选的)
// source.cancel('Operation canceled by the user.');


// const CancelToken = axios.CancelToken;
// let cancel;

// axios.get('/user/12345', {
//   cancelToken: new CancelToken(function executor(c) {
//     cancel = c;   通过方法置换把这个方法 换进来指向。
//   })
// });

// // 取消请求
// cancel();