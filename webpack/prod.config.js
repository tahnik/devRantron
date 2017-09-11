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
      './src/res/sass/main.sass',
      './src/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build/app'),
    chunkFilename: 'js/[name].bundle.js',
    filename: 'js/app.bundle.js',
  },
  module: {
    rules: [{
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
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
        },
        ],
      }),
    },
    {
      exclude: /node_modules/,
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          },
        },
      }),
    },
    ],
  },
  target: 'electron-renderer',
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
    new ExtractTextPlugin({
      filename: 'css/main.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'devRantron',
      template: 'src/index.ejs',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/app.js',
      },
      {
        from: './src/modules',
        to: 'modules',
      },
      {
        from: './src/res',
        to: 'res',
      },
    ], {
      ignore: [
        'sass/**',
      ],
    }),
  ],
};
