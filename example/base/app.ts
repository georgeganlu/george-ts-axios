
import Axios from '../../src/index';


Axios({
    url: '/base/get',
    method: 'get',
    data:{
        a: 1,
        b:2,
    }
});