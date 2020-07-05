

module.exports = function(router) {
    router.get('/validate/get', (req, res) => {
        res.send({
            msg: 'adsfasdf'
        });
    })

    router.post('/validate/post', (req, res) => {
        res.send({
            msg: 'post'
        });
    })

    router.get('/paramsSerializer/get', (req, res) => {
        console.log(req.query, 'req.params');
        res.send({
            msg: 'adsfasdf'
        });
    })
}