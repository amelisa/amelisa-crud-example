import path from 'path'
import webpack from 'webpack'

module.exports = {
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  entry: ['./app'],
  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js',
    chunkFilename: '[name].[id].js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        keep_fnames: true
      }
    })
  ],
  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json']},
      {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
      {include: /\.jsx$/, loaders: ['react-hot', 'babel', 'react-prefix'], exclude: /(node_modules)/},
      {include: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  resolveLoader: {
    root: __dirname + '/node_modules'
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
}
