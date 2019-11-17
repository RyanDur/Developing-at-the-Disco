const {loadCSS, loadImages} = require('./parts');
const {common} = require('./common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {EnvironmentPlugin} = require("webpack");

exports.production = (paths) => merge([common(paths), {
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
        new CspHtmlWebpackPlugin(),
        new EnvironmentPlugin({
            HOST: 'https://deafbeavers.apps.pcfone.io'
        })
    ]
},
    loadCSS({sourceMap: true}),
    loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]",
        },
    })
]);
