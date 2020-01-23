const {common} = require('./common');
const {loadCSS, loadImages} = require('./parts');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const {EnvironmentPlugin} = require("webpack");

exports.development = (paths) => merge([common(paths), {
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        host: process.env.HOST,
        port: process.env.PORT,
        overlay: true,
        historyApiFallback: true,
    },
    stats: 'minimal',
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Home',
            meta: {
                viewport: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            }
        }),
        new HtmlWebpackRootPlugin(),
        new CspHtmlWebpackPlugin(),
        new EnvironmentPlugin({
            HOST: 'http://localhost:3001'
        })
    ]
},
    loadCSS({sourceMap: true}),
    loadImages()
]);
