
module.exports = function (router) {
    router.post('/extend/post', function(req, res) {       
        res.json(req.body);
    });

    router.get('/extend/get', function(req, res) {       
        res.json({msg: 'hello get'});
    });

    router.options('/extend/options', function(req, res) {       
        res.end();
    });

    router.delete('/extend/delete', function(req, res) {       
        res.end();
    });

    router.head('/extend/head', function(req, res) {       
        res.end();
    });

    router.post('/extend/post1', function(req, res) {       
        res.json(req.body);
    });

    router.put('/extend/put', function(req, res) {       
        res.json(req.body);
    });

    router.patch('/extend/patch', function(req, res) {   
        console.log(req.body);   // 请求方法需要用大写。PATCH
        res.json(req.body);
    });

    // 测试推送
}