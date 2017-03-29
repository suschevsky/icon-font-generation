var gulp = require('gulp');
var webserver = require('gulp-webserver');
var opn = require('opn');

var server = {
    host: 'localhost',
    port: 4000
};

gulp.task('default', ['build', 'webserver', 'opn']);

gulp.task('build', ['html', 'opn']);

gulp.task('html', function() {
    return gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'));

});

gulp.task('webserver', ['html'], function() {
    gulp.src( 'dist' )
        .pipe(webserver({
            host: server.host,
            port: server.port,
            livereload: true,
            directoryListing: false
        }));
});

gulp.task('opn', function() {
    opn( 'http://' + server.host + ':' + server.port );
});
