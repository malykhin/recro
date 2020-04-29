const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    core: path.resolve('./src/core/index.js'),
    host: path.resolve('./src/host/index.js'),
    'react-client': path.resolve('./src/react-client/index.js'),
  },
  output: {
    path: path.resolve('./'),
    filename: '[name]/index.js',
    library: 'recro',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader' }],
  },
  externals: ['react'],
  devtool: 'inline-cheap-module-source-map',
}
