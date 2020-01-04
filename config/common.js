const merge = require('webpack-merge');
const {EnvironmentPlugin} = require("webpack");

exports.common = ({dist}) => merge([{
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
    output: {
        chunkFilename: "[name].[chunkhash:4].js",
        filename: '[name].[chunkhash:4].js',
        path: dist,
        publicPath: '/'
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
        })
    ]
}]);
