// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const prefixer = require('gulp-autoprefixer');
// const cleanerCss = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const browserSync = require('browser-sync').create();;
// const del = require('del');


import gulp from 'gulp';
import concat from 'gulp-concat';
import prefixer from 'gulp-autoprefixer';
import cleanerCss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import del from 'del';






const cssFiles = [
    './css/some.css',
    './css/gulp.css'
]
const jsFiles = [
    './js/lib.js',
    './js/some.js'
]

function styles (){
    return gulp.src(cssFiles)
        .pipe(concat('all.css'))
		.pipe(prefixer())
        .pipe(cleanerCss({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
    
}
function scripts (){
    return gulp.src(jsFiles)
    // pipe
        .pipe(concat('all.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./css/**/*.css", styles)
    gulp.watch("./js/**/*.js", scripts)
    gulp.watch('./*.html', browserSync.reload);
}
function clean(){
   return del(['build/*']);
}
// gulp.task('styles', styles);
// gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('clean', clean);
