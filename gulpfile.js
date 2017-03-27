'use strict';

let gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    path            = require('path'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    base64          = require('gulp-base64'),
    csso            = require('gulp-csso'),
    cssbeautify     = require('gulp-cssbeautify'),
    sass            = require('gulp-sass'),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    autoprefixer    = require('gulp-autoprefixer')
;

gulp.task('sass', () => {
    return gulp
        .src('./src/classlist.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./'))
});

gulp.task('clean', () => {
    return del(['./classlist.css', './classlist.min.css']);
});

gulp.task('min', () => {
   return gulp
       .src('./classlist.css')
       .pipe(csso())
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(gulp.dest('./'))
});

gulp.task('build-sass', ()=> {
   runSequence('sass', 'min');
});

gulp.task('build', () => {
    runSequence('clean', 'build-sass');
});

gulp.task('watch', ['build-sass'], () => {
   gulp.watch('./src/**/*.scss', ['build-sass']);
});

gulp.task('default', ['build']);