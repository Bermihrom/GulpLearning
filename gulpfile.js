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
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';


let isDev = process.argv.includes('--dev');
let isProd = !isDev;




const cssFiles = [
    './src/css/some.css',
    './src/css/gulp.css'
]
const jsFiles = [
    './src/js/lib.js',
    './src/js/some.js'
]

function styles (){
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('all.css'))
		.pipe(prefixer())
        .pipe(gulpIf(isProd, cleanerCss({
            level: 2
        })))
        .pipe(sourcemaps.write())
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
    gulp.watch("./src/css/**/*.css", styles)
    gulp.watch("./src/js/**/*.js", scripts)
    gulp.watch('./src/*.html', browserSync.reload);
}
function clean(){
   return del(['build/*']);
}
// gulp.task('styles', styles);
// gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('clean', clean);
