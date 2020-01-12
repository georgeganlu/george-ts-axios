const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const os = require('os');

app.use(cookieParser());

app.use(bodyParser.json());   // 解析传输数据
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
withCredentials(router)

app.use(router);

const port = 8089;
const host = getIPAdress();


const cors = {
    'Access-Control-Allow-Origin': `http://${host}:9800`,
    'Access-Control-Allow-Credentials': true,  // 允许 跨域传cookie
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': 'Content-Type, uuid'
};

function withCredentials(router) {
    router.get('/withCredentials/get', (req, res) => {
        let cookie = req.cookies;
        console.log(cookie);
        res.set(cors);
        res.set('uuid', '456213122-8899555-7785412-996321745');
        res.send(cookie);
    })
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