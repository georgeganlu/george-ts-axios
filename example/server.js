const express = require("express");
const webpackConfig = require('./webpack.config');
const webpack = require("webpack");
const bodyParser = require("body-parser");
const webpackDevMiddleWare = require("webpack-dev-middleware");
const webpackHotMiddleWare = require("webpack-hot-middleware");
const webpackDevServer = require("webpack-dev-server");

// 直接使用webpackDevServer 启用服务和执更新，及分别使用dev-middleWare和hot-middleWare来启用。


const app = express();


