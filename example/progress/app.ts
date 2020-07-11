

import axios from '../../src/index';
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css';


function Percentage(load: number, total: number) {
    return Math.floor(load) / total ;
}

// 三步走 Nprogress.start    Nprogress.set(0.2)   Nprogress.done();

// 先绑定进度条要执行的内容;

function loadProgressBar(): void {
    function progressStart(): void {
        axios.interceptors.request.use(config => {
            Nprogress.start();
            return config;
        })
    }

    function progressDone(): void {
        axios.interceptors.response.use(response => {
            Nprogress.done();
            return response
        }, reject => {

        })
    }
    progressStart();
    progressDone();
}

// 加载进度条。
loadProgressBar();

function progressSet(e: ProgressEvent): void {
    let { loaded, total } = e;
    let percent = Percentage(loaded, total);
    Nprogress.set(percent);
}


// 下载的进度条。
let downloadDiv = document.getElementById('download');
downloadDiv.addEventListener('click', function () {
    axios.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg', {
        onDownloadProgress: progressSet,
        onUploadProgress: progressSet,
        responseType: 'blob'
    }).then(res => {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(res.data);
        a.download = '';
        a.click();        
    })
});



// 上传的进度条。
let uploadInput = document.getElementById('file') as HTMLInputElement;

uploadInput.addEventListener("change", function() { 
    const formData = new FormData();
    if (uploadInput.files) {
        let file = uploadInput.files[0];
        formData.append('fille', file);
        axios.post('/upload/file', formData, {
            onDownloadProgress: progressSet,
            onUploadProgress: progressSet,
        }).then(res => {
            console.log(res);
        })
    }
})