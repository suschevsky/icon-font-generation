var gulp = require('gulp');
var webserver = require('gulp-webserver');
var opn = require('opn');
var tap = require('gulp-tap');
var fs = require('fs');

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

gulp.task('write-filenames-to-js-array', function() {
    var jsFilename = "dist/iconList.js";
    fs.writeFile(jsFilename);

    var iconList = fs.createWriteStream(jsFilename, {'flags': 'w'});

    iconList.write('var iconList = [];\n');

    var iconFileRegex = new RegExp("[a-z0-9-]*.svg");
    gulp.src('assets/*.svg')
        .pipe(tap(function(file, t) {
            iconList.write('iconList.push("' + file.path.match(iconFileRegex)[0] + '");\n');
        }));
});