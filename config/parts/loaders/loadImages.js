exports.loadImages = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'url-loader'
            }
        ]
    }
});
