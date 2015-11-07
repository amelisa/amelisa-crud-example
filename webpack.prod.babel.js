import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import nib from 'nib';

module.exports = {
	target:  'web',
	cache:   false,
	context: __dirname,
	devtool: false,
	entry:   ['./app'],
	output:  {
		path: __dirname + '/public/js',
		filename: 'bundle.js',
		chunkFilename: '[name].[id].js',
		publicPath: '/js/'
	},
	plugins: [
		new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module:  {
		loaders: [
			{include: /\.json$/, loaders: ['json']},
			{include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
			{include: /\.jsx$/, loaders: ['react-hot', 'babel'], exclude: /(node_modules)/},
			{include: /\.styl$/, loaders: ['style', 'css', 'postcss', 'stylus']},
			{include: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file']},
			{include: /\.md$/, loaders: ['html', 'markdown'] }
		]
	},
  postcss: function() {
		return [autoprefixer];
	},
	stylus: {
		use: [nib()]
	},
	resolve: {
		modulesDirectories: [
			'node_modules'
		],
		extensions: ['', '.json', '.js', '.jsx']
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
}
