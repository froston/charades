const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

var buildDir = path.resolve(__dirname, '../build');
var appDir = path.resolve(__dirname, '../src');

const config = {
  context: path.resolve(__dirname, '..'),
  devtool: false,
  bail: true,
  entry: appDir + '/index.js',
  output: {
    filename: 'bundle.js',
    path: buildDir,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Charades',
      filename: 'index.html',
      template: 'public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: [/\.mp3$/, /\.svg$/],
        use: 'url-loader'
      },
    ],
  }
}

module.exports = config
