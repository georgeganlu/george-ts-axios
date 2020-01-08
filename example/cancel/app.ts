import axios from '../../src/index';



// 下面是 CancelToken的两种调用方法。

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  } else {
    // 处理错误
  }
});

// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.');


const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

// 取消请求
cancel();