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
import less from 'gulp-less';


let isDev = process.argv.includes('--dev');
let isProd = !isDev;




const jsFiles = [
    './src/js/lib.js',
    './src/js/some.js'
]

function styles (){
    return gulp.src('./src/css/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
		.pipe(prefixer())
        .pipe(gulpIf(isProd, cleanerCss({
            level: 2
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/css'))
        .pipe(browserSync.stream());
    
}

function scripts (){
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./docs/js'))
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
    gulp.watch("./src/css/**/*.css", styles)
    gulp.watch("./src/js/**/*.js", scripts)
    gulp.watch('./src/*.html', browserSync.reload);
}

function html(){
    return gulp.src('./src/index.html')
     .pipe(gulp.dest('./docs'))
}

function clean(){
   return del(['docs/*']);
}

gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.parallel(styles, scripts, html));
gulp.task('main', gulp.series(clean,  gulp.parallel(html, styles, scripts), watch));
