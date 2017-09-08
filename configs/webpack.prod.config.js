const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'source-map',
  entry: {
    app: [
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
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin(),
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
        from: './src/main/modules',
        to: 'modules',
      },
      {
        from: './src/main/res',
        to: 'res',
      },
    ]),
  ],
};
