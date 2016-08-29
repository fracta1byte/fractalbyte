/* jshint esversion: 6 */

const gulp = require('gulp'),
      inject = require('gulp-inject'),
      browserSync = require('browser-sync'),
      sass = require('gulp-sass'),
      wiredep = require('wiredep').stream,
      useref = require('gulp-useref'),
      reload = browserSync.reload;

// Инжектировать все min.js и min.css файлы из bower_components в index.html
// между <!-- inject:{js,css} --> <!-- endinject -->
gulp.task('inject', () => {
  const target = gulp.src('./app/index.html');
  const sources = gulp.src([
    './bower_components/**/*.min.js',
    './bower_components/**/*.min.css'
  ], {read: false});

  target.pipe(inject(sources)).pipe(gulp.dest('./app'));
});

// Запустить dev-сервер browserSync
// baseDir - папка с файлом index.html (откуда стартует приложение)
// routes - маршруты для дополнительных подгружаемых скриптов и стилей
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

  gulp.watch('app/*.html').on('change', reload);
  gulp.watch('app/styles/**/*.sass', ['sass']);
});

// Скомпилировать .sass в .css
gulp.task('sass', () => {
  gulp.src('app/styles/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true})); // перезагрузить browserSync
});

// Вставить bower-зависимости, прописанные в bower.json dependencies
// между <!-- bowers:scss --> и <!-- endbower -->
gulp.task('wiredep', () => {
  gulp.src('app/styles/sass/vendor.sass')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles/sass'));

  gulp.src('app/index.html')
    .pipe(wiredep({
      exclude: [ /jquery/ ]
    }))
    .pipe(gulp.dest('app'));
});

// useref находит в index.html файле участок
// <!-- build:css styles/vendor.css --> <!-- endbuild -->
// собирает все файлы между этими комментариями и делает из них один файл,
// в данном случае vendor.css
/*
  СAUTION: запускать только когда появится папка dist, иначе стирает участок
  <!-- build:css styles/vendor.css --> <!-- endbuild -->
*/
gulp.task('useref', () => {
    gulp.src('app/index.html')
        .pipe(useref())
        // TODO: поменять на папку dist (или что-то в этом духе)
        .pipe(gulp.dest('app'));
});
