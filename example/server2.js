const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const os = require('os');

app.use(cookieParser());

const port = 8089;
const host = getIPAdress();

app.all('*', function (req, res, next) {
    // 设置请求头为允许跨域
    res.header('Access-Control-Allow-Origin', `http://${host}:9800`);
    res.header('Access-Control-Allow-Credentials', true);
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , test,yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }
});

app.use(bodyParser.json());   // 解析传输数据
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
withCredentials(router)

app.use(router);


console.log(host, 'host的内容是+++++++++++');

const cors = {
    'Access-Control-Allow-Origin': `http://${host}:9800`,
    'Access-Control-Allow-Credentials': true,  // 允许 跨域传cookie
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    // 'Access-Control-Request-Method': 'GET, OPTIONS, HEAD, POST',
    'Access-Control-Allow-Headers': 'test, accept, content-type',
    'Access-Control-Expose-Headers': 'Content-Type, uuid'
};

function withCredentials(router) {
    router.get('/withCredentials/get', (req, res) => {
        res.set(cors);
        let cookie = req.cookies;
        console.log(cookie);        
        
        res.cookie('x-xsrf-cookie', 'test-alex');
        // res.set('uuid', '456213122-8899555-7785412-996321745');
        res.send(cookie);
    })

    // router.get('/cookie/xs', (req, res) => {
    //     // let cookie = req.cookies;
    //     // console.log(cookie);
    //     res.set(cors);
    //     res.set('uuid', '456213122-8899555-7785412-996321745');
    //     res.set('x-xsrf-cookie', 'alex234234');
    //     res.cookie('x-xsrf-cookie', 'test-alex');
    //     res.send('asdfasdf');
    // })
}



module.exports = app.listen(port, host, () => {
    console.log(`server2的监听地址是: http://${host}:8089`);
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