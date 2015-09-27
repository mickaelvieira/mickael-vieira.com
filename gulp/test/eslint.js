/*eslint-env node*/
'use strict';

var getRoot = require('./../get-root-dir');

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('config');

var scriptsSrc = getRoot() + config.get('paths.scripts.src');

module.exports = function() {
    return gulp.src( [
        scriptsSrc + '**/*.js'
    ] )
    .pipe( eslint() )
    .pipe( eslint.format() );
};
