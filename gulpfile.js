/* jshint esversion: 6 */

const gulp = require('gulp'),
      inject = require('gulp-inject'),
      browserSync = require('browser-sync');

gulp.task('index', () => {
  const target = gulp.src('./app/index.html');
  const sources = gulp.src(['./bower_components/**/*.min.js', './bower_components/**/*.min.css'], {read: false});

  target.pipe(inject(sources)).pipe(gulp.dest('./app'));
});

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 8000,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});
