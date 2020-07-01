// console.log('234234234')

import axios from '../../src/index'




axios.post('http://192.168.1.104:8089/withCredentials/get', { a: 'b' },
    {
        withCredentials: true
    }
).then(res => {
    console.log(res, 'res');
})