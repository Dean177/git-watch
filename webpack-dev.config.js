var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


module.exports = {
  entry: [
    'webpack-dev-server/client?htt[://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './app/mainApp'
  ],
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/dist/',
    contentBase: __dirname + '/public/',
    libraryTarget: 'commonjs2'
  },
  target: 'atom',
  externals: fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin'; }),
  module: {
    loaders: [
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jsx?$/, loaders: [ 'react-hot', 'babel-loader?stage=1' ] },
      { test: /\.js?$/, loader: 'babel-loader?stage=1', include: path.join(__dirname, 'app') },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  devtool: 'source-map',
  debug: true,
  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.json', '.less' ]
  },
  plugins: [
    new webpack.PrefetchPlugin('react'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
