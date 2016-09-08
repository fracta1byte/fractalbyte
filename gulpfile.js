/* jshint esversion: 6 */

const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      wiredep = require('wiredep').stream,
      useref = require('gulp-useref'),
      jshint = require('gulp-jshint'),
      babel = require('gulp-babel'),
      gulpif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      cssnano = require('gulp-cssnano'),
      htmlmin = require('gulp-htmlmin'),
      size = require('gulp-size'),
      reload = browserSync.reload;

gulp.task('styles', () => {
    gulp.src('assets/styles/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/assets/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('.tmp/app'))
        .pipe(reload({stream: true}));
});

// for production
gulp.task('html', ['styles', 'scripts'], () => {
    gulp.src('**/*.html')
        .pipe(useref({searchPath: ['.tmp', 'app', '.']}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano({safe: true, autoprefixer: false})))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

// dev server
gulp.task('serve:dev', ['styles', 'scripts'], () => {
    browserSync({
        notify: false,
        port: 8000,
        server: {
            baseDir: ['.tmp/assets', './'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('**/*.html').on('change', reload);
    gulp.watch('assets/styles/**/*.sass', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
});

gulp.task('build', ['lint', 'html'], () => {
    gulp.src('dist/**/*')
        .pipe(size({title: 'build', gzip: true})); // logs gzipped size of site
});

// TODO: add task for images and fonts

// <!-- bowers:scss --> и <!-- endbower -->
gulp.task('wiredep', () => {
    gulp.src('assets/styles/sass/vendor.sass')
        .pipe(wiredep())
        .pipe(gulp.dest('assets/styles/sass'));

    gulp.src('index.html')
        .pipe(wiredep({
            exclude: [ /jquery/ ]
        }))
        .pipe(gulp.dest('./'));
});

// <!-- build:css styles/vendor.css --> <!-- endbuild -->
gulp.task('useref', () => {
    gulp.src('index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
    gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
