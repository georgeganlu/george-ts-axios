
module.exports = function config(router) {
    router.get('/config/post', function(req, res) {
        res.json({
            msg: 'config - post'
        });
    });
}
