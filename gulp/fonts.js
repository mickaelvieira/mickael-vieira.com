"use strict";

var getRoot = require('./get-root-dir');

var config = require('config');
var dest = getRoot() + config.get('paths.fonts.dest');

var gulp = require('gulp');

module.exports = function( cb ) {
    return gulp.src( [
        getRoot() + 'node_modules/bootstrap/fonts/*',
        getRoot() + 'node_modules/font-awesome/fonts/*'
    ])
        .pipe( gulp.dest( dest ) );
};
