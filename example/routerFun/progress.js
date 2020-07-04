

module.exports = function(router) {
    router.post('/upload/file', (req, res) => {
        console.log('+++++++++++++++++++++++++++');
        res.json({
            msg: '上传成功'
        })
    })
}