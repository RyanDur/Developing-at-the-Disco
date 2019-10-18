const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const EnvironmentPlugin = require("webpack").EnvironmentPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: './dist',
    host: process.env.HOST,
    port: process.env.PORT,
    overlay: true
  },
  target: 'node',
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    }),
    new HtmlWebpackRootPlugin(),
    new CspHtmlWebpackPlugin(),
    new WebpackNotifierPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new DashboardPlugin(),
    new EnvironmentPlugin({
      USERS_ENDPOINT: '/users',
      HOST: 'http://localhost:3001',
      MAX_USERNAME_LENGTH: 256
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
