const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-clean-css');
const merge = require('merge-stream');

gulp.task('sass', () => {
  const scssStream = gulp.src('public/style/scss/style.scss')
    .pipe(sass())
    .pipe(concat('scss-files.scss'));

  const cssStream = gulp.src('public/style/css/main.css')
    .pipe(sass())
    .pipe(concat('css-files.css'));

  const mergedStream = merge(scssStream, cssStream)
    .pipe(concat('style.css'))
    .pipe(minify())
    .pipe(gulp.dest('public/style/css'));

  return mergedStream;
});


gulp.watch([
  'public/style/scss/style.scss',
  'public/style/css/main.css',
], ['sass']);
