
module.exports = function cookie(router) {
    router.get('/cookie/xs', function(req, res) {
        const cors = {
            'Access-Control-Allow-Origin': `*`,
            // 'Access-Control-Allow-Credentials': true,  // 允许 跨域传cookie
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Expose-Headers': 'Content-Type, uuid'
        };
        res.set(cors);
        console.log(req.cookies, 'cookie的值是');
        res.send({
            msg: 'cookie - get'
        });
    });

    // 同域的请求 -- 默认会带上cookie
}
