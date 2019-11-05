exports.loadCSS = ({sourceMap}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1, sourceMap}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap,
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('postcss-autoreset')(),
                                require('postcss-initial')(),
                                require('postcss-preset-env')({
                                    stage: 3,
                                    features: {
                                        'nesting-rules': true
                                    }
                                }),
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            }
        ]
    }
});
