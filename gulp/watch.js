/*eslint-env node*/
'use strict';

var getRoot = require('./get-root-dir');

var gulp = require('gulp');
var config = require('config');

var stylesSrc = getRoot() + config.get('paths.styles.src');
var scriptsSrc = getRoot() + config.get('paths.scripts.src');

module.exports = function() {

    // JS
    gulp.watch(
        [ scriptsSrc + '**/*.js' ],
        [ 'eslint' ]
    );

    // CSS
    gulp.watch(
        [ stylesSrc + '**/*.scss' ],
        [ 'css' ]
    );
};
