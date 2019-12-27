import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123


axios({
  url: '/config/post',
  method: 'post',
  data: {a: 1},              // 这里data传输的内容不同，会导致完全不同的效果 主要看是不是 [object Object];   Object.prototype.toString();
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})


axios({
    url: '/config/post',
    method: 'post',
    data: qs.stringify({a: 3}),              // 这里data传输的内容不同，会导致完全不同的效果 主要看是不是 [object Object];   Object.prototype.toString();
    headers: {
      test: '321'
    }
  }).then((res) => {
    console.log(res.data)
  })