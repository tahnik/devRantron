const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main/res/css/main.sass',
      './src/main/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './app/build'),
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
          options: {
            presets: ['react', 'es2015', 'stage-1'],
          },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'devRantron',
      template: 'src/main/index.ejs',
    }),
    new CopyWebpackPlugin([
            { from: './src/main/res', to: 'res' },
    ]),
  ],
};
