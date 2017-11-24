var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss'),
    gulp = require('gulp');

gulp.task('default', ['css', 'js'], function () {
    console.log("Gulp Stared");
});
gulp.task('css', function () {
    gulp.src('src/**/*.css')
        .pipe(uglifycss())
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('public/dist/css'))
});

gulp.task('js', function () {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('public/dist/js'))
});