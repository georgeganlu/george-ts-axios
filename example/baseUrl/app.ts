
import axios from '../../src/index';


const instance = axios.create({
    baseUrl: 'http://172.19.23.42:8089/'
});

instance.get('/base/url').then(res => {
    console.log(res, 'res的值是++++++++');
});



