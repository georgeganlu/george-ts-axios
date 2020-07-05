const atob = require('atob');

module.exports = function(router) {
    router.post('/auth/post1', (req, res) => {
        console.log(req.body, 'post 请求的body的内容');
        res.send("asdfasdfasdf")
    });


    router.post('/auth/post2', (req, res) => {
        let auth = req.headers.authorization;
        const [type, basic] = auth.split(' ');

        let [ user, pass ] = atob(basic).split(':');
        console.log(user, pass);
        res.send({
            msg: 'asdfasdf'
        });
    })
}