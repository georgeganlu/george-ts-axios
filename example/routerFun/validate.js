

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
}