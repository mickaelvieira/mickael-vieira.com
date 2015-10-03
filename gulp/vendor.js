"use strict";

var getRoot = require('./get-root-dir');

var config = require('config');
var dest = getRoot() + config.get('paths.styles.dest');

var gulp = require('gulp');

module.exports = function( cb ) {
    return gulp.src( [
        getRoot() + 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        getRoot() + 'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe( gulp.dest( dest ) );
};
