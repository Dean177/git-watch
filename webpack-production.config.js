var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: { main: './app/mainApp' },
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/dist/',
    contentBase: __dirname + '/public/',
    libraryTarget: 'commonjs2'
  },
  target: 'atom',
  externals: fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' }),
  module: {
    loaders: [
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jsx?$/, loaders: [ 'react-hot', 'babel-loader?stage=1' ] },
      { test: /\.js?$/, loader: 'babel-loader?stage=1' }
    ]
  },
  devtool: opts.devtool,
  debug: true,
  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.json' ]
  },
  plugins: [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
  ]
};
