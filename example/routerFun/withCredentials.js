

const cors = {
    // 'Access-Control-Allow-Origin': `http://${host}:9800`,
    // 'Access-Control-Allow-Credentials': true,  // 允许 跨域传cookie
    // 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'test, accept, Content-Type',
    // 'Access-Control-Expose-Headers': 'Content-Type, uuid'
  'Access-Control-Allow-Origin': `http://172.19.23.42:8089`,
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};


// 这里是a网站是有缺陷的。
module.exports = function more(router) {
    router.get('/with/test', function(req, res) {
        res.set(cors);
        console.log(req.cookies, 'with/test过来的');
        res.json(req.cookies)
    });
}
