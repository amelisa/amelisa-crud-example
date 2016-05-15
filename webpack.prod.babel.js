import path from 'path'
import webpack from 'webpack'

module.exports = {
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  entry: {
    admin: './apps/admin',
    main: './apps/main',
    promo: './apps/promo'
  },
  output: {
    path: path.resolve('./public/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[id].js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      BASE_URL: `"${process.env.BASE_URL}"`
    }}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: { keep_fnames: true }
    })
  ],
  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json']},
      {include: /\.js$/, loaders: ['babel'], exclude: /(node_modules)/},
      {include: /\.jsx$/, loaders: ['babel', 'react-prefix'], exclude: /(node_modules)/}
    ],
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
    noParse: /node_modules\/quill\/dist/
  },
  reactPrefixLoader: {
    ignore: /^mdl-/
  },
  resolveLoader: {
    root: path.resolve('./node_modules')
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
    fallback: [path.resolve('./node_modules')],
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'amelisa': path.resolve('./node_modules/amelisa'),
      'amelisa-mongo': path.resolve('./node_modules/amelisa-mongo'),
      'amelisa-redis': path.resolve('./node_modules/amelisa-redis'),
      'react-amelisa': path.resolve('./node_modules/react-amelisa'),
      'relay-amelisa': path.resolve('./node_modules/relay-amelisa')
    }
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
}
