const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const buildDir = path.resolve(__dirname, '../build');
const appDir = path.resolve(__dirname, '../src');
const publicPath = '';
const publicUrl = publicPath.slice(0, -1);

const config = {
  context: path.resolve(__dirname, '..'),
  devtool: false,
  bail: true,
  entry: appDir + '/index.js',
  output: {
    filename: 'bundle.js',
    path: buildDir,
    publicPath: publicPath,
  },
  plugins: [
    new InterpolateHtmlPlugin({'PUBLIC_URL': ''}),    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify('')
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
      favicon: 'public/favicon.ico'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        console.log(message);
      },
      minify: false,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
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
