const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/static/',
    pathinfo: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mp3$/,
        use: 'file-loader',
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 3000,
  },
  performance: {
    hints: false,
  },
}

module.exports = config
