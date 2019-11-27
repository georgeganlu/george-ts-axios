
module.exports = function base(router): void {
    router.get('/base/get', function(req, res): void {
        res.json(req.query);
    })
}