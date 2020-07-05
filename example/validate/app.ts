import axios from '../../src/index';



axios.post('/validate/post', { a: 'b' }, { 
    validateStatus(status) {
        return status>= 200 && status < 400
    }
}).then(res =>　{
    console.log(res);
})