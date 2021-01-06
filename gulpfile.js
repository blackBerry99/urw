const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

function sassCompile(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'))

}
gulp.task('sass-compile', sassCompile)
function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}
const cssFiles = [
    './src/css/fonts.css',
    './src/css/main.css',
    './src/css/media.css',
]

const jsFiles = [
    './src/js/slick.js',
    './src/js/main.js',
]


function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        // .pipe(uglify({
        //     // toplevel: true
        // }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*scss', sassCompile)
    gulp.watch('./src/css/**/*css', styles)
    gulp.watch('./src/js/**/*js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
// gulp.task('del', clean);

gulp.task('watch', watch);
gulp.task('build', gulp.series(sassCompile, clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));




