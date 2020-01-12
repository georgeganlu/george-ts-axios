import axios, { AxiosError } from '../../src/index';


// axios.get('/cookie/get', {
//     // withCredentials: true
// }).then(res => {
//     console.log(res);
// })
let url1 = 'http://172.19.23.127:8089/withCredentials/get'

let url2 = 'http://192.168.56.1:8089/withCredentials/get' 

axios(url2, {
    withCredentials: true
}).then(res => {
    console.log(res);
})
