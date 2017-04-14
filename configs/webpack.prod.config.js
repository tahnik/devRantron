const webpack = require('webpack');
const path = require('path');

const BabiliPlugin = require('babili-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'source-map',
  entry: {
    app: [
      // 'babel-polyfill',
      'react-hot-loader/patch',
      './src/main/res/css/main.sass',
      './src/main/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../app/build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        exclude: /node_modules/,
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
    ],
  },
  target: 'electron',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({ filename: 'main.css', allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'devRantron',
      template: 'src/main/index.ejs',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/main/app.js',
        to: '',
      },
      {
        from: './src/main/res',
        to: 'res',
      },
    ]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new BabiliPlugin(),
  ],
};
