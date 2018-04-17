const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const smp = new SpeedMeasurePlugin();

module.exports = {
  context: path.join(__dirname, '../app'),
  /**
   * There is a known problem with devtools in webpack right now.
   * Will add it back once that is fixed.
   */
  // devtool: 'cheap-eval-source-map',
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
    // new DashboardPlugin(),
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

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          beautify: false,
          comments: false,
          compress: true,
          mangle: true,
          toplevel: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
