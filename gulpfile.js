var del =  require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var babel = require('babel/register');
var electron = require('gulp-electron');
var webpack = require('webpack');
var shell = require("gulp-shell");
var WebpackDevServer = require('webpack-dev-server');
var webpackDevConfig = require('./webpack-dev.config');

var packageJson = require('./package.json');

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

gulp.task('start-dev', shell.task(['export DEBUG=git-watch:* HOT=1 NODE_ENV=development && electron .']));

gulp.task('webpack-server', function() {
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    progress: true,
    colors: true,
    historyApiFallback: true,
    inline: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { gutil(err); }
    gutil.log('Listening at ' + webpackDevConfig.output.publicPath);
  });
});

gulp.task('package', function() {
  gulp.src('.').pipe(electron({
    src: '.',
    packageJson: packageJson,
    cache: './cache',
    release: './release',
    version: 'v0.29.2',
    apm: './node_modules/atom-package-manager/bin/apm',
    platformsSupport: ['win64-64', 'linux-x64'],
    platformResources: {
      win: {
        'icon': 'app/images/icon.ico'
      }
    }
  }))
});
