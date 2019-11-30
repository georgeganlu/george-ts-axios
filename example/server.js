const express = require("express");
const webpackConfig = require('./webpack.config');
const webpack = require("webpack");
const bodyParser = require("body-parser");
const multipary = require("connect-multiparty");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevServer = require("webpack-dev-server");
const routerFun = require("./routerFun/index");
const os = require('os');
const path = require("path");
const app = express();

// 直接使用webpackDevServer 启用服务和执更新，及分别使用dev-middleWare和hot-middleWare来启用。
// 尝试使用两个devServer的方式。

// webpackDevServer.addDevServerEntrypoints(webpackConfig, {
//     publicPath: 'build',
// }); 

// const compiler = webpack(webpackConfig);
// const webpackServer = new webpackDevServer(compiler, {
//     publicPath: 'build',
// });


const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleWare(compiler, {
    publicPath: '/build/',
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname    // 静态服，也可以设置cookies;
    // , 
    // {
    // setHeaders(res) {
    //     res.coo
    // }
));
app.use(bodyParser.json());   // 解析传输数据
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(multipary({  // 文件上传中间
    uploadDir: path.resolve(__dirname, "upload-file"),
}));

const router = express.Router();

routerFun(router);  // 注册所有的router路由方法。
// 第一个的注册方法。
// router.get('/base/get', function(req, res) {
//     res.json(req.query);
// });

app.use(router);

const port = process.env.PORT || 9800;
const host = getIPAdress();

module.exports = app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});



function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
