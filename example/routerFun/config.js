
module.exports = function config(router) {
    router.post('/config/post', function(req, res) {
        res.json({
            msg: 'config - post'
        });
    });
}
