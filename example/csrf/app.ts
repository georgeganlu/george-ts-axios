import axios from '../../src/index';



const instance = axios.create({
    xsrfCookieName: 'xsrf-token-name',
    xsrfHeaderName: 'xsrf-tooken-header'
});


instance.post('/csrf/get', {a: 'post测试'}).then(res => {
    console.log(res);
})