const {common} = require('./common');
const {loadCSS} = require('./parts');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {EnvironmentPlugin} = require("webpack");

exports.development = (paths) => merge([common(paths), {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        host: process.env.HOST,
        port: process.env.PORT,
        overlay: true
    },
    stats: 'minimal',
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Home',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new HtmlWebpackRootPlugin(),
        new CspHtmlWebpackPlugin(),
        new EnvironmentPlugin({
            HOST: 'http://localhost:3001'
        })
    ]
}, loadCSS({sourceMap: true})]);
