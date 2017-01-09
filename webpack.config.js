/**
 * Created by Administrator on 2016/4/28.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: "./index.js",
    },
    output: {
        path: __dirname + "/build/",
        // './dist/' not working for webpack-dev-server !!
        publicPath: __dirname + "/build/",
        filename: "bundle.js",
        // chunkFilename: "[id].chunk.js",
        //发布模块配置
        // library:'module name',
        // libraryTarget:'var',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel-loader"], exclude: /node_modules/
            },
            {
                test: /\.less$/,
                // loader: "css!less"
                loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap", {publicPath: './'})
            },
            {
                test: /\.css$/,
                // loader: "css"
                loader: ExtractTextPlugin.extract("css?sourceMap", {publicPath: './'})
            },
            {
                test: /\.(png|jpe?g|gif|eot|svg|ttf|woff2?)$/,
                loader: "url-loader?limit=20480&name=images/[name].[ext]"
            }
        ]
    },
    plugins: [
        //分离出CSS
        new ExtractTextPlugin("style.css", {
            allChunks: true
        }),
        //启用压缩
        // new webpack.optimize.UglifyJsPlugin()
    ],
    externals: {
        // require("jquery") is external and available on the global var jQuery
        // "jquery": "jQuery"
    }
};