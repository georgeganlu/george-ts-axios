
module.exports = function base(router) {
    router.get('/base/get', function(req, res) {
        console.log(req.query, "req++++++++++++++++++++++");
        res.json(req.query);
    })
}
