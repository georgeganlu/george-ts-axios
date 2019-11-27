
import Axios from '../../src/index';


axios({
    url: '/base/get',
    method: 'get',
    data:{
        a: 1,
        b:2,
    }
});