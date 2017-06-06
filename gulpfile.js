'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./public/styles/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/css'));
});

console.log('gulp ran');

gulp.task('sass:watch', function () {
    gulp.watch('./public/styles/scss/*.scss', ['sass']);
});