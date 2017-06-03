const { resolve } = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: resolve('public'),
  entry: {
    script: './js/App.js',
    style: './scss/style.scss',
  },
  output: {
    path: resolve(__dirname, './public/dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: resolve(__dirname, './public/js'),
        use: ['eslint-loader'],
      },
      {
        test: /\.js$/,
        include: resolve(__dirname, './public/js'),
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        include: resolve(__dirname, './public/scss'),
        use: ExtractTextPlugin.extract([
          'css-loader?sourceMap&url=false',
          'sass-loader?sourceMap&url=false',
        ]),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
    }),
    new LiveReloadPlugin(),
  ],
};
