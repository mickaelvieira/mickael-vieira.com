/*eslint-env node*/
'use strict';

var gulp = require('gulp');
var reqDir = require('require-dir');
var tasks = reqDir('./gulp/');

if ( process.env.NODE_ENV === 'development') {

    tasks.test = reqDir('./gulp/test/');

    gulp.task( 'specs', tasks.test.specs );
    gulp.task( 'eslint', tasks.test.eslint );
}

gulp.task( 'css', tasks.css );
gulp.task( 'clean', tasks.clean );
gulp.task( 'browserify', tasks.browserify.browserify );
gulp.task( 'watchify', tasks.browserify.watchify );
gulp.task( 'vendor', tasks.vendor );
gulp.task( 'fonts', tasks.fonts );

gulp.task( 'build', [ 'css', 'browserify', 'vendor', 'fonts' ] );
gulp.task( 'default', [ 'clean', 'build' ]);

gulp.task( 'watch', [ 'watchify' ], tasks.watch );
