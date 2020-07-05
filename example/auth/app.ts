

import axios from '../../src/index';




// axios.post('/auth/post1', { a: 'b' }).then(res => {
//     console.log(res, 'res的内容是');
// })


axios.post('/auth/post2', { a: 'b' }, {
    auth: {
        username: 'alex',
        password: '123456'
    }
}).then(res => {
    console.log(res, 'res的内容是');
})
