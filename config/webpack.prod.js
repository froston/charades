const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const buildDir = path.resolve(__dirname, '../build');
const appDir = path.resolve(__dirname, '../src');

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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
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
      inject: true,
      title: 'Charades',
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        console.log(message);
      },
      minify: false,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new CopyWebpackPlugin([{ 
        from: 'public', 
        to: buildDir
      }],
      {
        ignore: [
          'index.html'
        ]
      }
    )
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
        use: ['style-loader', 'css-loader'],
        include: appDir,
      },
      {
        test: [/\.mp3$/, /\.svg$/],
        use: 'url-loader',
        include: appDir,
      },
      {
        test: /\.png$/,
        loader: require.resolve('file-loader'),
        include: appDir,
        options: {
          name: '/icons/[name].[ext]'
        }
      }
    ],
  }
}

module.exports = config
