const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const os = require('os');
const fs = require('fs');
const path = require('path');

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

// app.use(express.static(path.join(__dirname)))

const router = express.Router();
withCredentials(router)

app.use(router);


const cors = {
    // 'Access-Control-Allow-Origin': `http://${host}:9800`,
    // 'Access-Control-Allow-Credentials': true,  // 允许 跨域传cookie
    // 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'test, accept, Content-Type',
    // 'Access-Control-Expose-Headers': 'Content-Type, uuid'
  'Access-Control-Allow-Origin': `http://${host}:9800`,
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function withCredentials(router) {
    router.post('/with/get', (req, res) => {
        res.set(cors);
        console.log(req.cookies, '234234234234');
        res.json(req.cookies)
        // res.cookie('x-xsrf-cookie', 'test-alex');
        // res.set('uuid', '456213122-8899555-7785412-996321745');
       
    })
    router.get('/csrf/get', (req, res) => {
        res.setHeader("Content-Type", "text/html");
        let pathTem = path.join(__dirname, 'server2-template/csrf.html');
        res.send(fs.readFileSync(pathTem));
    });

    router.get('/base/url', (req, res) => {
        res.json({
            msg: '更新base/url的内容'
        });
    });

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