'use strict';

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var pug             = require('gulp-pug');
var imagemin        = require('gulp-imagemin');
var browserSync     = require('browser-sync');

var src = {
  pug: 'src/pug/',
  img: 'src/assets/',
  sass: 'src/scss/',
  fonts: 'src/fonts/*.*',
  js: 'src/js/*.js',
};

var dest = {
  html: 'dest/',
  img: 'dest/images',
  css: 'dest/css',
  fonts: 'dest/fonts/',
  js: 'dest/js/',
};

gulp.task('sass', function () {
  return gulp
    .src(src.sass + 'all.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('pug', function () {
  return gulp
    .src(src.pug + '*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(dest.html))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy-fonts', function () {
  return gulp
    .src(src.fonts)
    .pipe(gulp.dest(dest.fonts));
});

gulp.task('copy-img', function () {
  return gulp
    .src(src.img + '**/*.*')
    .pipe(gulp.dest(dest.img));
});

gulp.task('copy-js', function () {
  return gulp
    .src(src.js)
    .pipe(gulp.dest(dest.js));
});

gulp.task('watch', function () {
  gulp.watch(src.pug + '**/*.pug', ['pug']);
  gulp.watch(src.sass + '**/*.scss', ['sass']);
  gulp.watch(src.img, ['copy-img']);
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'dest/',
    },
    port: 8080,
    open: true,
    notify: false,
  });
});

gulp.task('default', [
  'sass',
  'pug',
  'copy-img',
  'copy-js',
  'copy-fonts',
  'watch',
  'browserSync',
], function () {});

gulp.task('css', function () {
  return gulp
    .src(src.sass + 'all.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false,
    }))
    .pipe(gulp.dest(dest.css));
});

gulp.task('html', function () {
  return gulp
    .src(src.pug)
    .pipe(pug())
    .pipe(gulp.dest(dest.html));
});

gulp.task('imagemin', function () {
  return gulp
    .src(src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(dest.img));
});

gulp.task('build', ['css', 'html', 'imagemin', 'copy-fonts', 'copy-js'], function () {});
