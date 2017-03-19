const webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.join(__dirname, '../app'),
	devtool: 'source-map',
	entry: {
		'app': [
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
		loaders: [{
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-1'],
			},
		}],
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: './src/main/app.js', 
				to: path.join(__dirname, '../app/build')
			},
			{
				from: './src/main/index.html', 
				to: path.join(__dirname, '../app/build')
			},
			{
				from: './src/main/res', 
				to: path.join(__dirname, '../app/build/res')
			},
		]),
		new webpack.NamedModulesPlugin(),
	],
};
