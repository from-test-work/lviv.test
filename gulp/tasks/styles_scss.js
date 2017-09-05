module.exports = function () {
    $.gulp.task('styles_scss:build', () => {
        return $.gulp.src('./dev/static/scss/style.scss')
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./build/static/css/'))
    });

    $.gulp.task('styles_scss:dev', () => {
        return $.gulp.src('./dev/static/scss/style.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass())
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
