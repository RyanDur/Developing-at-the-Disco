const merge = require('webpack-merge');
exports.common = ({dist}) => merge([{
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    target: 'node',
    output: {
        filename: 'bundle.js',
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
    }
}]);
