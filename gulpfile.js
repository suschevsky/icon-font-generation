var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('default', ['build', 'webserver']);

gulp.task('build', ['html']);

gulp.task('html', function() {
    return gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'));

});

gulp.task('webserver', ['html'], function() {
    gulp.src( 'dist' )
        .pipe(webserver({
            host: 'localhost',
            port: 4000,
            livereload: true,
            directoryListing: false
        }));
});
