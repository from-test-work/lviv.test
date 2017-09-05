module.exports = function() {
    $.gulp.task('jsTask:dev', () => {
        return $.gulp.src('./dev/static/js/custom.js')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.babel({
                presets: ['es2015']
            }))
            .pipe($.gp.sourcemaps.write('.'))
            .pipe($.gulp.dest('./build/static/js/'))
            
    });

    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src(['node_modules/svg4everybody/dist/svg4everybody.js'])
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src(['node_modules/svg4everybody/dist/svg4everybody.min.js'])
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gp.uglifyjs())
            .pipe($.gulp.dest('./build/static/js/'));
    });

    $.gulp.task('js:copy', () => {
        return $.gulp.src(['./dev/static/js//**/*.js',
                            '!./dev/static/js/custom.js',
                            '!./dev/static/js/libs.min.js'])
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
