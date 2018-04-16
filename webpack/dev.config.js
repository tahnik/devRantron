const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/res/sass/main.sass',
      './src/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    hot: true,
    publicPath: 'http://localhost:8080/',
    historyApiFallback: true,
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  target: 'electron-renderer',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: './src/app.js',
      },
      {
        from: './src/index.html',
      },
      {
        from: './src/res',
        to: 'res',
      },
    ]),
    new DashboardPlugin(),
  ],
};
