import webpack from 'webpack'
import config from './webpack.prod.babel.js'

config.cache = true
// config.debug = true
// config.devtool = 'eval'

config.entry.webpack = 'webpack-hot-middleware/client'

config.plugins = [
  new webpack.DefinePlugin({'process.env': {
    NODE_ENV: `"${process.env.NODE_ENV}"`,
    BASE_URL: `"${process.env.BASE_URL}"`
  }}),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

config.module.loaders = [
  {include: /\.json$/, loaders: ['json']},
  {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
  {include: /\.jsx$/, loaders: ['react-hot', 'babel', 'react-prefix'], exclude: /(node_modules)/},
  {include: /\.css$/, loaders: ['style', 'css']}
]

config.devServer = {
  publicPath: config.output.publicPath,
  // contentBase: './public',
  hot: true,
  inline: true,
  lazy: false,
  quiet: false,
  noInfo: true,
  historyApiFallback: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
}

module.exports = config
// export default config
