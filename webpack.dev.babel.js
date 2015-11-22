import webpack from 'webpack'
import config from './webpack.prod.babel.js'

config.cache = true
// config.debug = true
// config.devtool = 'eval'

config.entry.unshift(
  'webpack-hot-middleware/client'
)

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
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
