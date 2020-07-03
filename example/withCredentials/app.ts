// console.log('234234234')

import axios from '../../src/index'




axios.post('http://172.19.23.42:8089/with/get', { a: 'b' },
    {
        withCredentials: true
    }
).then(res => {
    console.log(res, 'res');
})