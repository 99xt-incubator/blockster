const path = require('path');
// eslint-disable-next-line import/no-unresolved
const webpack = require('serverless-webpack');
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;

module.exports = {
  entry: webpack.lib.entries,
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
    }],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  // sequelize issue, waiting for a solution from the library. Issue #7509
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
  plugins: [
    new ContextReplacementPlugin(
      /sequelize(\\|\/)/,
      path.resolve(__dirname, 'src')
    )],
};