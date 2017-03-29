var gulp = require('gulp');
var webserver = require('gulp-webserver');
var opn = require('opn');
var tap = require('gulp-tap');
var fs = require('fs');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var svgmin = require('gulp-svgmin');
var path = require('path');

var server = {
    host: 'localhost',
    port: 4000
};

var fontName = 'my-icon-font';

gulp.task('default', ['write-filenames-to-js-array', 'iconfont', 'html', 'webserver', 'opn']);

gulp.task('write-filenames-to-js-array', function() {

    var jsFilename = 'dist/iconList.js';
    fs.writeFile(jsFilename);

    var iconList = fs.createWriteStream(jsFilename, {'flags': 'w'});

    iconList.write('var iconList = [];\n');

    var iconFileRegex = new RegExp("[a-z0-9-]*.svg");
    gulp.src('assets/*.svg')
        .pipe(tap(function(file, t) {
            iconList.write('iconList.push("' + file.path.match(iconFileRegex)[0] + '");\n');
        }));
});

gulp.task('iconfont', function() {
    gulp.src(['assets/*.svg'])
        .pipe(svgmin())
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'src/icons-template.ejs',
            fontPath: '/fonts/' + fontName + '/',
            targetPath: path.resolve(__dirname, 'dist') + '/css/' + fontName + '.css'

        }))
        .pipe(iconfont({
            normalize: true,
            fontName: fontName,
            appendCodepoints: true
        }))
        .pipe(gulp.dest('dist/fonts/' + fontName));
});

gulp.task('html', function() {
    return gulp.src(['./src/index.html'])
        .pipe(gulp.dest('./dist'));

});

gulp.task('webserver', function() {
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