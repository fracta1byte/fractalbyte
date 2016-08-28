/* jshint esversion: 6 */

const gulp = require('gulp'),
      inject = require('gulp-inject');

gulp.task('index', () => {
  const target = gulp.src('./app/index.html');
  const sources = gulp.src(['./bower_components/**/*.min.js', './bower_components/**/*.min.css'], {read: false});

  target.pipe(inject(sources)).pipe(gulp.dest('./app'));
});
