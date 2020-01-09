
module.exports = function base(router) {
    router.get('/cancel/get', (req, res) => {
        
        setTimeout(() => {
            res.json('hello')
          }, 1000)
        
    });

    router.post('/cancel/post', (req, res) => {
        setTimeout(() => {
            res.send({
               msg: 'post请求' 
            })
        }, 1000)
    })
}
