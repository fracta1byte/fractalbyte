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
size = require('gulp-size'),
ngAnnotate = require('gulp-ng-annotate'),
rimraf = require('rimraf'),
runSequence = require('run-sequence'),
templateCache = require('gulp-angular-templatecache'),
inject = require('gulp-inject'),
reload = browserSync.reload;

gulp.task('clean:tmp', function (cb) {
    rimraf('.tmp', cb);
});

gulp.task('clean:dist', function (cb) {
    rimraf('dist', cb);
});

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

gulp.task('lint', () => {
    gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

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

gulp.task('templates', () => {
    gulp.src('app/**/*.html')
    .pipe(templateCache({
        module: 'fractalByte',
        root: '.',
        standalone: false
    }))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('client:build', ['wiredep', 'lint'], () => {
    gulp.src('index.html')
    .pipe(inject(
        gulp.src(
            '.tmp/scripts/templates.js',
            {read: false}
        ),
        {
            ignorePath: '.tmp',
            addRootSlash: false
        }
    ))
    .pipe(useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano({safe: true, autoprefixer: false})))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', () => {
    runSequence('clean:dist', 'styles', 'scripts', 'templates', 'client:build');
});

gulp.task('serve:prod', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

// dev build and serve
gulp.task('serve', ['wiredep', 'lint', 'styles', 'scripts'], () => {
    browserSync({
        notify: false,
        port: 8000,
        server: {
            baseDir: ['.tmp', '.', 'app'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('**/*.html').on('change', reload);
    gulp.watch('assets/styles/**/*.sass', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
});

// TODO: add task for images and fonts
