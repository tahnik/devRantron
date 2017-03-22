const webpack = require('webpack');
let path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '../app'),
	devtool: 'inline-source-map',
	entry: {
		'app': [
			'babel-polyfill',
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/main/js/index.js',
			'./src/main/res/main.sass',
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
		loaders: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1'],
				},
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin({filename: 'main.css', allChunks: true}),
		new HtmlWebpackPlugin({
      title: 'devRantron',
      template: 'src/main/index.ejs',
    }),
		new CopyWebpackPlugin([
            {from: './src/main/app.js'},
            {from: './src/main/res', to: 'res'},
        ]),
	],
};
