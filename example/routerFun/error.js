
module.exports = function base(router) {
    // 模拟掉网络的情况。
    router.post('/error/offline', function(req, res) {
        res.json(req.body);      
    });

    // 请求超时的情况  -- 6s后返回，前台的超时时间为3s
    router.post('/error/timeout', function(req, res) {
        setTimeout(() =>　{
            res.json(req.body);
        }, 6000)        
    });

    router.post('/error/status', function(req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: 'hello world'
            });
        } else {
            res.status(500);
            res.end();
        }
    });
}
