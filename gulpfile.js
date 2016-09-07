/* jshint esversion: 6 */

const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      wiredep = require('wiredep').stream,
      useref = require('gulp-useref'),
      reload = browserSync.reload;

gulp.task('styles', () => {
    gulp.src('assets/styles/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/assets/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    gulp.src('app/**/*.js')
        .pipe(gulp.dest('.tmp/app'))
        .pipe(reload({stream: true}));
});

// for production
gulp.task('html', ['styles', 'scripts'], () => {
    gulp.src('**/*.html')
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

// TODO: write task for prod server

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
