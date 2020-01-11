
module.exports = function cookie(router) {
    router.get('/cookie/get', function(req, res) {
        console.log(234234234);
        console.log(req.cookies);
        res.send({
            msg: 'cookie - get'
        });
    });
}
