

import axios from '../../src/index';
import qs from 'qs';


axios.get('/paramsSerializer/get', {
    params: {
        a: 'b',
        list: [1, 3, 4, 5]
    },
    paramsSerializer(params) {
        return qs.stringify(params);        
    }
})