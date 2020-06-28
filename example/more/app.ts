import axios from '../../src/index';

import 'nprogress/nprogress.css';
import Nprogress from 'nprogress';


// 就是一个文件的上传和下载的功能。

const instance = axios.create();
// loadNprogress;   // 加载条的全过程均在拦截器中间来实现。

function calcProgress() {

    const startProgress = function() {
        instance.interceptors.request.use(config => {
            Nprogress.start();
            return config;
        });
    }
}











const downloadButton = document.getElementById('download');

downloadButton.addEventListener('click', function() {
    instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
}, false);


const uploadButton = document.getElementById('upload');

uploadButton.addEventListener('click', function() {
    let fromData = new FormData();
    let fileE = document.getElementById('file') as HTMLInputElement
    if (fileE.files) {
        fromData.append('file', fileE.files[0]);
    }
    instance.post('/more/post', fromData);
}, false);
