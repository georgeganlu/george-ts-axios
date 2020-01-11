const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(cookieParser());

app.use(bodyParser.json());   // 解析传输数据
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
withCredentials(router)

app.use(router);

const cors = {
    'Access-Control-Allow-Origin': 'http://172.19.23.127:9800',
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

const port = 8089;

module.exports = app.listen(port, '172.19.23.127', () => {
    console.log("server2的监听地址是: http://172.19.23.127:8089");
});