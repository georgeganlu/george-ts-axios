import axios, { AxiosError } from '../../src/index';


// axios.get('/cookie/get', {
//     // withCredentials: true
// }).then(res => {
//     console.log(res);
// })

let url = 'http://172.19.23.127:8089/withCredentials/get'

axios(url, {
    withCredentials: true
}).then(res => {
    console.log(res);
})
