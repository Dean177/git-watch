var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var babel = require('babel/register');
var babelify = require('babelify');
var envify = require('envify/custom');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['watch']);

gulp.task('test', ['test:browser']);

gulp.task('test:browser', function() {
  gulp
    .src('tests/browser/**/*.spec.js', {read: false})
    .pipe(mocha({
      compilers: {
        js: babel
      },
      reporter: 'nyan'
    }));
});

gulp.task('watch', function(done) {
  gulp.watch('app/styles', ['styles']);
  gulp.start('scripts:watch');
  done();
});

gulp.task('make', ['assets', 'styles', 'scripts']);

gulp.task('clean', function() {
  del('dist/**/*');
});

gulp.task('assets', function() {
  gulp
    .src([
      "app/index.html",
      "app/shim.js",
      "app/images/**/*"
    ],
    { base: 'app'})
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function(){
    gulp
      .src("app/styles/**/*.less")
      .pipe(
        less({paths: ['app/styles/lib']})
          .on('error', function(err) => {
            logError(err);
            this.emit('end');
          })
      )
      .pipe(gulp.dest('dist'));

    gulp.src("app/styles/lib/**/*")
      .pipe(gulp.dest('dist/lib'))
});

gulp.task('scripts', function() {
    return compileScripts(false);
});

gulp.task('scripts:watch', function() {
    return compileScripts(true);
});

function compileScripts(shouldWatchForChanges) {
  var bundler = browserify({
    entries: ['main.jsx'],
    basedir: 'app/scripts',
    extensions: ['.jsx', '.js'],
    insertGlobals: false,
    detectGlobals: false,
    debug: true,
    transforms: [],
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler.transform(envify({NODE_ENV: 'development'}));
  bundler.transform(
      // Stage 1 allows for some proposed ES7 goodies: https://babeljs.io/docs/usage/experimental/
      { global: false, stage: 1  }, babelify
  );


  if (shouldWatchForChanges) {
    bundler = watchify(bundler);
    bundler.on('update', compileScripts);
  }

  return compileScripts();

  function compileScripts() {
    gutil.log("Compiling scripts...");
    return bundler.bundle()
      .on('end', function () { gutil.log("Complation finished"); })
      .on('error', errorHandler)
      .pipe(source('main.js'))
      .pipe(gulp.dest('./dist'));
  }
}

function errorHandler(err) {
    gutil.log(err.message);
    this.emit("end");
}