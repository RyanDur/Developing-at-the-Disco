const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const EnvironmentPlugin = require("webpack").EnvironmentPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: './dist'
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
    new EnvironmentPlugin({
      USERS_ENDPOINT: 'http://localhost:3000/users'
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
