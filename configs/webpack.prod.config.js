const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/main/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../app/build'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1'],
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader/useable',
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/main/app.js',
        to: path.join(__dirname, '../app/build'),
      },
      {
        from: './src/main/index.html',
        to: path.join(__dirname, '../app/build'),
      },
      {
        from: './src/main/res',
        to: path.join(__dirname, '../app/build/res'),
      },
    ]),
    new webpack.NamedModulesPlugin(),
  ],
};
