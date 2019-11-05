const config = require('./config'),
    merge = require('webpack-merge'),
    path = require('path'),
    PATHS = {
        dist: path.resolve(__dirname, 'dist')
    };

module.exports = mode => mode === 'production' ?
    merge(config.production(PATHS), {mode}) :
    merge(config.development(PATHS), {mode});
