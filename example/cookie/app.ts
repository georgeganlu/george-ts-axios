import axios, { AxiosError } from '../../src/index';



let url1 = 'http://172.19.23.42:8089/withCredentials/get'
// axios.get(url1, {
//     withCredentials: true
// }).then(res => {
//     console.log(res);
// })


// let url2 = 'http://192.168.56.1:8089/withCredentials/get' 
// let url3 = 'http://georgetest.com/cookie/get';

// axios(url3, {
//     withCredentials: true
// }).then(res => {
//     console.log(res);
// })


const request = axios.create({
    xsrfCookieName:'x-xsrf-cookie',
    xsrfHeaderName: 'x-xsrf-header'
});

// let url4 = 'http://172.19.23.42:8089/cookie/xs' 
let url5 = '/cookie/xs' 
request(url1, {
    withCredentials: true
}).then(res => {
    console.log(res);
});
