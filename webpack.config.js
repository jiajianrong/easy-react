/*
 *  MXR change at 20161108
 *
 *  update babel and inline babel-polyfill to support es6 other API ( promise... )
 *  HtmlWebpackPlugin      no html but tmpl2html in compile
 *  WebpackMd5Hash         solve single file hash ( single css file )
 *  add-module-exports     to correct react-router require
 *  autoprefixer-loader work in with postcss
 *  common.[chunkhash].js  'no work with' webpack-dev-server --hot
 *  split main.js
 *
 *  support es6 ( promise... ) es7 ( fetch... )
 *  for example
 *  import "babel-polyfill";  import 'whatwg-fetch';
 *  fetch(url).then(response => response.json())
 *          .then(data => console.log(data))
 *          .catch(e => console.log("Oops, error", e))
 *
 */

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var WebpackMd5Hash = require('webpack-md5-hash');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};


//var outputDir = '../dist';
//var entryPath = './js/app.js';
//var path      = require('path');

var plugins;
/*
 *  init plugins
 */

if ( isProduction() ) {

    plugins = [
        new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'react/js/common_[hash].js'
        }),
        /*new HtmlWebpackPlugin({
            template: './views/app.html',
            filename: './views/app.html',
            chunks: ['main', 'common'],
            inject: 'body'
        }),*/
        new HtmlWebpackPlugin({
            template: './views/operatorData.html',
            filename: './react/views/operatorData.html',
            chunks: ['operatorData', 'common'],
            inject: 'body'
        })/*,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false
            }
        })*/
    ];

} else {

    plugins = [
        new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'react/js/common_[hash].js'
        }),
        /*new HtmlWebpackPlugin({
            template: './views/app.html',
            filename: './views/app.html',
            chunks: ['main', 'common'],
            inject: 'body'
        }),*/
        new HtmlWebpackPlugin({
            template: './views/operatorData.html',
            filename: './react/views/operatorData.html',
            chunks: ['operatorData', 'common'],
            inject: 'body'
        })
    ];

}

 
var config = {

    entry: {
        //main: './js/app.js',
        operatorData: './js/operatorData.js'
    },
    output: {
        path: !isProduction() ? '../cfqbms_react_dist' : '../cfqbms_react_dist',   //'../../pic2.58.com/finance/58/m/js/new_lottery',
        publicPath: !isProduction() ? '/' : '/',       //'//j2.58cdn.com.cn/finance/58/m/js/new_lottery/',
        chunkFilename: "[name]_[hash].js",
        filename: 'react/js/[name]_[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        "add-module-exports"
                    ]
                }
            },
            { test: /\.css$/, loader: "style!css!autoprefixer-loader" },
            { test: /\.scss$/, loader: "style!css!autoprefixer-loader!sass" },
            { test: /\.png$/, loader: "url?limit=8192&name=img/[name].[ext]" }
        ] 
    },
    externals: {
        "react": 'React',
        "react-dom": 'ReactDOM',
        "react-router": 'ReactRouter'
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        proxy: {
            // 运营商数据
            '/jxl/phone/*': {
                target: 'http://localhost:3000',
                //target: 'http://10.252.57.59:8080',
                secure: false,
                changeOrigin: true
            }
        }
    },
    devtool: false

};

module.exports = config;