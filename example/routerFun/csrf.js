

module.exports = function(router) {
    router.post('/csrf/get', (req, res) => {
        let val = req.headers['xsrf-tooken-header']
        console.log(decodeURIComponent(val));        
        res.json({
            'msg': '测试成功'
        })
    })
}