'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect-php');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var gzip = require('gulp-gzip');
var bs = require('browser-sync').create();
var style = '';

var paths = {
  php: ['*.php'],
  css: ['css/*.css'],
  js: ['js/*.js']
}

gulp.task('style', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest('dist/'))
    .pipe(bs.stream());
});
exports.style = style;

gulp.task('watch', function () {
  gulp.watch(paths.css, gulp.series('style', 'css', 'reload'));
  gulp.watch(paths.php, gulp.series('reload'));
  gulp.watch(paths.js, gulp.series('zipJs', 'reload'));
})


gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(postcss([
      require('autoprefixer')
    ]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gzip())
    .pipe(gulp.dest('dist/'));
});

gulp.task('zipJs', function () {
  gulp.src(paths.js)
    .pipe(gzip())
    .pipe(gulp.dest('js/'));
})

gulp.task('autoprefixer', () =>
  gulp.src(paths.css)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
    .pipe(bs.stream())
);

gulp.task('reload', async function () {
  bs.reload();
});

gulp.task('connect', function () {
  connect.server({
    port: 3000,
  }, function () {
    bs.init(null, {
      injectChanges: true,
      reloadDelay: 500,
      server: {
        baseDir: './'
      },
      ui: {
        port: 3000
      }
    })
    gulp.watch(paths.css).on("change", gulp.series('css', 'style', 'reload'));
    gulp.watch(paths.php).on('change', gulp.series('reload'));
  });
});

gulp.task('default', gulp.parallel('connect', 'watch'))