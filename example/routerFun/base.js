
module.exports = function base(router) {
    router.get('/base/get', function(req, res) {
        console.log(req.query, "req++++++++++++++++++++++");
        res.json(req.query);
    });

    router.post('/base/post', function(req, res) {
        res.json(req.body);
    });

    router.post('/base/buffer', function(req, res) {
         let msg = [];
         req.on('data',(chunk) => {
             if (chunk) {
                 msg.push(chunk);
             }
         });
         req.on('end', () => {
             let buf = Buffer.concat(msg);
            //  console.log(buf, "buf的内容是++++++++++++");
             res.json(buf.toJSON());
         });        
    });
}
