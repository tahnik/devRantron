const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  /**
   * There is a known problem with devtools in webpack right now.
   * Will add it back once that is fixed.
   */
  // devtool: 'source-map',
  entry: {
    app: [
      './src/res/sass/main.sass',
      './src/js/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build/app'),
    // chunkFilename: 'js/[name].bundle.js',
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
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    },
    {
      exclude: /node_modules/,
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    ],
  },
  target: 'electron-renderer',
  plugins: [
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
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
