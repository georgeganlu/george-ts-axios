
import Axios from '../../src/index';
const qs = require("qs");

let params1 = qs.stringify({
    a: '1',
    b: '2',
})

Axios({
    url: `/base/get?${params1}`,
    method: 'get',    
});