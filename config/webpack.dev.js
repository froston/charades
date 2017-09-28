const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Charades - Dev',
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
  },
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    port: 3001,
  },
  performance: {
    hints: false,
  },
}

module.exports = config
