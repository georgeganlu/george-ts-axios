const fs = require('fs');
const path = require("path");
const webpack = require("webpack");



// node common.js
module.exports = { 
    // entry的入口表示法。
    mode: 'development',
    entry: fs.readdirSync(__dirname).reduce((entrys, dir) => {
        let fullDir = path.join(__dirname, dir);
        let entry = path.join(fullDir, "app.ts");
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entrys[dir] = [entry];   // 上面是检查这个文件目录是否存在 且 文件目录存在。
        }
        return entrys;
    }, {}),

    output:{
        path: path.join(__dirname, "build"),
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader', 'css-loader'
                ]
            },
            // {
            //     test: /\.styl$/,
            //     user:
            // }
        ]
    },
    resolve: {   // 自动解析用户引入文件的扩展，使用户引入文件时不用带这些后缀。
        extensions: ['.ts', '.js', '.tsx']
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
}