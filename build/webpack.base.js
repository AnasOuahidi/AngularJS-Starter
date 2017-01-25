'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')

let webpack_base = {
    entry: config.entry,
    output: {
        path: config.assets_path,
        filename: '[name].js',
        publicPath: config.assets_url
    },
    resolve: {
        extensions: ['', '.js', '.css', '.json'],
        alias: {
            root: path.join(__dirname, '../js'),
            picker: 'pickadate/lib/picker'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: [/node_modules/, /js\/Libraries\/lib/]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /js\/Libraries\/lib/]
            },
            {
                test: /\.scss$/,
                loaders: ['css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['css']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html',
                query: {
                    minimize: true
                }
            }
        ]
    },
    babel: {
        babelrc: false,
        presets: [
            'es2015',
            'stage-2'
        ],
        plugins: ["transform-runtime"]
    },
    plugins: [],
    devServer: {
        headers: {"Access-Control-Allow-Origin": "*"}
    }
}

if (config.html) {
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    webpack_base.plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            inject: true,
            favicon: 'img/favicon.png'
        })
    )
}

module.exports = webpack_base
