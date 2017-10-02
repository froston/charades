const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

var buildDir = path.resolve(__dirname, '../public');
var appDir = path.resolve(__dirname, '../src');

const config = {
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  entry: appDir + '/index.js',
  output: {
    filename: 'bundle.js',
    path: buildDir,
    pathinfo: true,
  },
  plugins: [
    new InterpolateHtmlPlugin({'PUBLIC_URL': JSON.stringify('/')}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_URL: JSON.stringify('')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Charades - Dev',
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
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
        test: [/\.mp3$/, /\.svg$/, /\.png$/],
        use: 'url-loader'
      }   
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    port: 3001,
    open: true
  },
  performance: {
    hints: false,
  },
}

module.exports = config
