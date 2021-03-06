const merge = require('webpack-merge');
const {EnvironmentPlugin} = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

exports.common = ({dist}) => merge([{
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
    output: {
        chunkFilename: "[name].[chunkhash:4].js",
        filename: '[name].[chunkhash:4].js',
        path: dist
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new EnvironmentPlugin({
            USERS_ENDPOINT: '/users',
            USERNAME_MAX_LENGTH: 256
        }),
        new CopyPlugin([{
            from: 'config/Staticfile', to: '.'
        }])
    ]
}]);
