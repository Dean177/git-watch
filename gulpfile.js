var del =  require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var babel = require('babel/register');
var webpack = require('webpack');
var shell = require("gulp-shell");
var WebpackDevServer = require('webpack-dev-server');
var webpackDevConfig = require('./webpack-dev.config');


gulp.task('test', function() {
  var mochaConfig = { compilers: { js: babel }, reporter: 'nyan' };
  return gulp
    .src('tests/**/*.spec.js', {read: false})
    .pipe(mocha(mochaConfig));
});

gulp.task('test:junit', function() {
  var mochaConfig = {
    compilers: { js: babel },
    reporter: 'mocha-junit-reporter'
  };
  return gulp
    .src('tests/**/*.spec.js', {read: false})
    .pipe(mocha(mochaConfig));
});

gulp.task('start', ['webpack-server', 'start-dev']);

gulp.task('start-dev', shell.task(['export HOT=1 NODE_ENV=development && electron .']));

gulp.task('webpack-server', function() {
  // webpack-dev-server --config webpack-dev-server.config.js --hot --progress --colors --port 2992 --inline
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    progress: true,
    colors: true,
    historyApiFallback: true,
    inline: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err); }
    gutil.log('Listening at ' + webpackDevConfig.output.publicPath);
  });
});
