const {loadCSS} = require('./parts');
const {common} = require('./common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

exports.production = (paths) => merge([common(paths), {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Home',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }
        }),
        new HtmlWebpackRootPlugin(),
        new CspHtmlWebpackPlugin()
    ]
}, loadCSS({sourceMap: true})]);
